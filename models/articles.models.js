const {db} = require('../db/connection')

exports.selectArticleById = (articleId) => {
   return db.query(`
   SELECT * FROM articles
   WHERE article_id = $1`, [articleId])
   .then((data) => {
    const article = data.rows
    if(article.length === 0) {
        return Promise.reject({msg: "Article not found",status:404})
    }
    return article
   })
}