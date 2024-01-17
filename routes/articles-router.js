const articlesRouter = require('express').Router();
const {getArticleById, getAllArticles, getCommentsByArticleId, postCommentToArticle, patchArticleById} = require("../controllers/articles.controllers.js")

articlesRouter.get('/articles', getAllArticles)
articlesRouter.get('/articles/:article_id', getArticleById)
articlesRouter.get('/articles/:article_id/comments', getCommentsByArticleId)
articlesRouter.post('/articles/:article_id/comments', postCommentToArticle)
articlesRouter.patch('/articles/:article_id', patchArticleById)

module.exports = articlesRouter