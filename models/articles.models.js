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
      return article;
    });
};

exports.selectAllArticles = () => {
  return db
    .query(
      `
    SELECT articles.article_id, articles.article_img_url, articles.author, articles.created_at, articles.title, articles.votes, articles.topic, COUNT(comments.article_id)::int AS comment_count
    FROM articles       
    LEFT JOIN comments 
    ON comments.article_id = articles.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC
`
    )
    .then((data) => {
        if(data.rows.length === 0) {
        Promise.reject({msg: "There are no articles in the database"})
      }
      return data.rows;
    });
};

exports.selectCommentsByArticleId = (articleId) => {
    return db.query(`
        SELECT * FROM comments
        WHERE article_id = $1
        ORDER BY created_at DESC`, [articleId])
    .then(({rows}) => {
        if (rows.length === 0) {
            return Promise.reject({ msg: "This article has no comments", status: 404 });
          }
        return rows
    })
}

exports.addCommentToArticle = (articleId, body) => {
    return db.query(`
        INSERT INTO comments
        (body, author, article_id)
        VALUES ($1, $2, $3)
        RETURNING body`, [body.body, body.username, articleId])
    .then(({rows}) => {
        return rows[0]
    })
}

