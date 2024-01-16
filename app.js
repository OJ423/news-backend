const express = require("express")
const {getApiEndpoints} = require("./controllers/api-endpoint.controllers.js")
const {getAllTopics} = require("./controllers/topics.controllers.js")
const {getArticleById, getAllArticles, getCommentsByArticleId, postCommentToArticle, patchArticleById} = require("./controllers/articles.controllers.js")
const {deleteCommentById} = require('./controllers/comments.controllers.js')
const {getAllUsers} = require('./controllers/users.controllers.js')
const {applicationErrors, customErrors, psqlErrors} = require("./errors/error-handling")

const app = express()
app.use(express.json())

// ENDPOINTS
app.get('/api', getApiEndpoints)
// TOPICS
app.get('/api/topics', getAllTopics)
// ARTICLES
app.get('/api/articles', getAllArticles)
app.get('/api/articles/:article_id', getArticleById)
app.get('/api/articles/:article_id/comments', getCommentsByArticleId)
app.post('/api/articles/:article_id/comments', postCommentToArticle)
app.patch('/api/articles/:article_id', patchArticleById)
// COMMENTS
app.delete('/api/comments/:comment_id', deleteCommentById)
// USERS
app.get('/api/users', getAllUsers)
// Error Handling

app.use(customErrors)
app.use(psqlErrors)
app.use(applicationErrors)

module.exports = app

