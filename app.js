const express = require("express")
const {getAllTopics} = require("./controllers/topics.controller")
const {applicationErrors} = require("./errors/error-handling")

const app = express()
app.use(express.json())

// API Requests
app.get('/api/topics', getAllTopics)

// Error Handling

app.use(applicationErrors)

module.exports = app

