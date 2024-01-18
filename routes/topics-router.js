const {getAllTopics, postNewTopic} = require("../controllers/topics.controllers.js")
const topicsRouter = require('express').Router();

topicsRouter.get('/', getAllTopics)
topicsRouter.post('/', postNewTopic)

module.exports = topicsRouter