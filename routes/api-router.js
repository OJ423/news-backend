const apiRouter = require('express').Router();
const apiEndpointsRouter = require("./api-endpints-router")
const articlesRouter = require('./articles-router.js')
const usersRouter = require('./users-router.js')
const commentsRouter = require('./comments.router.js')
const topicsRouter = require('./topics-router.js')

apiRouter.use('', apiEndpointsRouter)
apiRouter.use('/articles', articlesRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/topics', topicsRouter)
apiRouter.use('/comments', commentsRouter)

module.exports = apiRouter