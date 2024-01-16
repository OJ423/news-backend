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

exports.checkCommentBodyFormat = (body) => {
    if(typeof body.body === 'object') {
        return Promise.reject({status:400, msg: "Wrong data type in body"})
    }
}