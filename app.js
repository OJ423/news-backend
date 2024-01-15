const express = require("express")
const {getApiEndpoints} = require("./controllers/api-endpoint.controllers.js")
const {getAllTopics} = require("./controllers/topics.controllers.js")
const {getArticleById, getAllArticles, getCommentsByArticleId, postCommentToArticle} = require("./controllers/articles.controllers.js")
const {applicationErrors, customErrors, psqlErrors} = require("./errors/error-handling")

const app = express()
app.use(express.json())

// API Requests
app.get('/api', getApiEndpoints)
app.get('/api/topics', getAllTopics)
app.get('/api/articles', getAllArticles)
app.get('/api/articles/:article_id', getArticleById)
app.get('/api/articles/:article_id/comments', getCommentsByArticleId)
app.post('/api/articles/:article_id/comments', postCommentToArticle)

// Error Handling

app.use(customErrors)
app.use(psqlErrors)
app.use(applicationErrors)

module.exports = app

