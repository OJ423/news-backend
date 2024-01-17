const articlesRouter = require('express').Router();
const {getArticleById, getAllArticles, getCommentsByArticleId, postCommentToArticle, patchArticleById, postArticle} = require("../controllers/articles.controllers.js")

articlesRouter.get('/', getAllArticles)
articlesRouter.get('/:article_id', getArticleById)
articlesRouter.get('/:article_id/comments', getCommentsByArticleId)
articlesRouter.post('/:article_id/comments', postCommentToArticle)
articlesRouter.patch('/:article_id', patchArticleById)
articlesRouter.post('/', postArticle)


module.exports = articlesRouter