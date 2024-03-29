const { query } = require("express");
const { db } = require("../db/connection");

exports.selectArticleById = (articleId) => {
  return db
    .query(
      `
   SELECT articles.article_id, articles.article_img_url, articles.author, articles.created_at, articles.title, articles.votes, articles.topic, articles.body, COUNT(comments.article_id)::INT AS comment_count FROM articles
   LEFT JOIN comments
   ON comments.article_id = articles.article_id
   WHERE articles.article_id = $1
   GROUP BY articles.article_id
   `,
      [articleId]
    )
    .then(({rows}) => {
      if (rows.length === 0) {
        return Promise.reject({ msg: "Article not found", status: 404 });
      }
      return rows[0];
    });
};

exports.selectAllArticles = (topic, sortBy = "created_at", order = "DESC", limit, p) => {
  //BASE QUERY
  let sqlQuery = `
    SELECT articles.article_id, articles.article_img_url, articles.author, articles.created_at, articles.title, articles.votes, articles.topic, COUNT(comments.article_id)::int AS comment_count, count(*) OVER() AS total_count
    FROM articles       
    LEFT JOIN comments 
    ON comments.article_id = articles.article_id
    `
  //VALIDATION
  const sortValidator = ["title", "author", "topic", "created_at", "votes", "article_id", "comment_count"]
  const orderUpper = order.toUpperCase()
  
  //FILTER
  let queryValue = []
  if(topic !== undefined) {
    sqlQuery += ` WHERE articles.topic = $1`
    queryValue.push(topic)
  }
  sqlQuery += ` GROUP BY articles.article_id`
  //SORT BY
  if(sortValidator.includes(sortBy)) {
    sortBy !== "comment_count" ?
    sqlQuery += ` ORDER BY articles.${sortBy} ${orderUpper}` :
    sqlQuery += ` ORDER BY ${sortBy} ${orderUpper}`
  }
  else if (!sortValidator.includes(sortBy)) {
    return Promise.reject({status: 400, msg: "Please use another sort_by type."})
  }
  //LIMIT
  let rowLimit = limit !== undefined ? limit.toString() : undefined
  if(limit !== undefined) {
    if (limit < 1 || /^\D/g.test(rowLimit)) rowLimit = 10
    sqlQuery += ` LIMIT ${rowLimit}`
  }
  //PAGINATION
  const pNum = +p
  if (/^\D/g.test(p) && p !== undefined) {
    return Promise.reject({status:400, msg: "Invalid page number"})
  }
  else if (p !== undefined && pNum === 1 && limit !== undefined) {
    sqlQuery += ` OFFSET 0`
  }
  else if (p !== undefined && pNum === 1 && limit === undefined) {
    sqlQuery += ` LIMIT 10 OFFSET 0`
  }
  else if (p !== undefined && pNum > 1 && limit !== undefined) {
    const offsetValue = (p-1) * rowLimit
      sqlQuery += ` OFFSET ${offsetValue}`
  }
  else if (p !== undefined && pNum > 1 && limit === undefined) {
    const offsetValue = (p-1) * 10
      sqlQuery += ` LIMIT 10 OFFSET ${offsetValue}`
  }

  //RETURN QUERY
  return db.query(sqlQuery, queryValue)
  .then(({rows}) => {
    if(rows.length === 0 && p !== undefined) {
      return Promise.reject({status:404, msg: "No records, exceeded the max page"})
    }
    return rows;
  });
};

exports.selectCommentsByArticleId = (articleId, limit, p) => {
  let sqlQuery = `
    SELECT * FROM comments
    WHERE article_id = $1
    ORDER BY created_at DESC`
  const queryValue = [articleId]

  if (limit !== undefined) {
    if(limit < 1 || /^\D/g.test(limit)) limit = 10
    sqlQuery += ` LIMIT ${limit}`
  }

  const pNum = +p
  if (/^\D/g.test(p) && p !== undefined) {
    return Promise.reject({status:400, msg: "Invalid page number"})
  }
  else if (p !== undefined && pNum === 1 && limit !== undefined) {
    sqlQuery += ` OFFSET 0`
  }
  else if (p !== undefined && pNum === 1 && limit === undefined) {
    sqlQuery += ` LIMIT 10 OFFSET 0`
  }
  else if (p !== undefined && pNum > 1 && limit !== undefined) {
    const offsetValue = (p-1) * limit
      sqlQuery += ` OFFSET ${offsetValue}`
  }
  else if (p !== undefined && pNum > 1 && limit === undefined) {
    const offsetValue = (p-1) * limit
      sqlQuery += ` LIMIT 10 OFFSET ${offsetValue}`
  }

  return db.query(sqlQuery, queryValue)
  .then(({rows}) => {
    if(p !== undefined && rows.length === 0) {
      return Promise.reject({status:404, msg:"No records, exceeded the max page"})
    }
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

exports.addNewArticle = (author, title, body, topic, article_img_url = "https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700") => {
  return db.query(`
    INSERT INTO articles
    (author, title, body, topic, article_img_url)
    VALUES
    ($1, $2, $3, $4, $5)
    RETURNING *`,
    [author,title, body, topic, article_img_url])
  .then(({rows}) => {
    const articleId = rows[0].article_id;
    return db
    .query(
      `
   SELECT articles.article_id, articles.title, articles.body, articles.author, articles.created_at, articles.votes, articles.topic, articles.article_img_url, COUNT(comments.article_id)::INT AS comment_count FROM articles
   LEFT JOIN comments
   ON comments.article_id = articles.article_id
   WHERE articles.article_id = $1
   GROUP BY articles.article_id
   `,
      [articleId])
  })
  .then(({rows}) => {
    return rows[0]
  })

}

exports.removeArticle = (articleId) => {
  return db.query(`
    DELETE FROM comments
    WHERE article_id = $1
    RETURNING *`, [articleId])
  .then(({rows}) => {
    return db.query(`
      DELETE FROM articles
      WHERE article_id = $1
      RETURNING *`, [articleId])
  })
  .then(({rows}) => {
    if (rows.length === 0) {
      return Promise.reject({status:404, msg: "Article does not exist"})
    }
  })
}
