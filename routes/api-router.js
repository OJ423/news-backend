const apiRouter = require('express').Router();
const apiEndpointsRouter = require("./api-endpints-router")
const articlesRouter = require('./articles-router.js')
const usersRouter = require('./users-router.js')
const commentsRouter = require('./comments.router.js')
const topicsRouter = require('./topics-router.js')

apiRouter.get('', apiEndpointsRouter)
apiRouter.get('/articles', articlesRouter)
apiRouter.get('/articles/:article_id', articlesRouter)
apiRouter.get('/articles/:article_id/comments', articlesRouter)
apiRouter.post('/articles/:article_id/comments', articlesRouter)
apiRouter.patch('/articles/:article_id', articlesRouter)
apiRouter.get('/users', usersRouter)
apiRouter.get('/topics', topicsRouter)
apiRouter.delete('/comments/:comment_id', commentsRouter)

module.exports = apiRouter