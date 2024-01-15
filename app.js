const express = require("express")
const {getApiEndpoints} = require("./controllers/api-endpoint.controller.js")
const {getAllTopics} = require("./controllers/topics.controller")
const {applicationErrors, customErrors} = require("./errors/error-handling")

const app = express()
app.use(express.json())

// API Requests
app.get('/api', getApiEndpoints)
app.get('/api/topics', getAllTopics)

// Error Handling

app.use(customErrors)
app.use(applicationErrors)

module.exports = app

