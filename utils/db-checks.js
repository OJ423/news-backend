const {db} = require('../db/connection')

exports.checkArticleExists = (articleId) => {
    return db.query(`
        SELECT * FROM articles
        WHERE article_id = $1`, [articleId])
    .then(({rows}) => {
        if (rows.length === 0) {
            return Promise.reject({status: 404, msg: `Article does not exist`})
        }
    })
}

exports.checkUserExists = (username) => {
  return db.query(`
    SELECT * FROM users
    WHERE username = $1`, [username])
  .then(({rows}) => {
    if (rows.length === 0) {
      return Promise.reject({status: 404, msg: `User does not exist`})
    }
  })
}

exports.checkTopicsExists = (topic) => {
  if(topic !== undefined) {
    return db.query(`
      SELECT * FROM topics
      WHERE slug = $1`, [topic])
    .then(({rows}) => {
      if (rows.length === 0) {
        return Promise.reject({status: 404, msg: `This topic does not exist`})
      }
    })
  }
}

exports.checkUserExists = (user) => {
    return db.query(`
      SELECT * FROM users
      WHERE username = $1`, [user])
    .then(({rows}) => {
      if (rows.length === 0) {
        return Promise.reject({status: 404, msg: `User not registered`})
      }
    })
}

exports.checkCommentBodyFormat = (body) => {
    if(typeof body.body === 'object') {
        return Promise.reject({status:400, msg: "Wrong data type in body"})
    }
}
