const { db } = require("../db/connection");

exports.selectArticleById = (articleId) => {
  return db
    .query(
      `
   SELECT * FROM articles
   WHERE article_id = $1`,
      [articleId]
    )
    .then((data) => {
      const article = data.rows;
      if (article.length === 0) {
        return Promise.reject({ msg: "Article not found", status: 404 });
      }
      return article[0];
    });
};

exports.selectAllArticles = (query) => {
  let sqlQuery = `
    SELECT articles.article_id, articles.article_img_url, articles.author, articles.created_at, articles.title, articles.votes, articles.topic, COUNT(comments.article_id)::int AS comment_count
    FROM articles       
    LEFT JOIN comments 
    ON comments.article_id = articles.article_id
    `
  const topicKey = Object.keys(query) 
  const validSort = ["topic"]
  let queryValue = []
  if(validSort.includes(topicKey[0])) {
    sqlQuery += ` WHERE articles.topic = $1`
    queryValue.push(query.topic)
  }
  sqlQuery += ` GROUP BY articles.article_id
  ORDER BY articles.created_at DESC`
  return db.query(sqlQuery, queryValue)
  .then(({rows}) => {
    return rows;
  });
};

exports.selectCommentsByArticleId = (articleId) => {
    return db.query(`
        SELECT * FROM comments
        WHERE article_id = $1
        ORDER BY created_at DESC`, [articleId])
    .then(({rows}) => {
        return rows
    })
}

exports.addCommentToArticle = (articleId, body) => {
    return db.query(`
        INSERT INTO comments
        (body, author, article_id)
        VALUES ($1, $2, $3)
        RETURNING body, author AS username, article_id`, [body.body, body.username, articleId])
    .then(({rows}) => {
        return rows[0]
    })
}

exports.updateArticleById = (articleId, votes) => {
  return db.query(`
    UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING *`,[votes, articleId])
  .then(({rows}) => {
    if(rows.length === 0) return Promise.reject({status:404, msg: "Article does not exist"})
    return rows[0]
  })
}

