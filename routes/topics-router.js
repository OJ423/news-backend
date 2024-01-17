const {getAllTopics} = require("../controllers/topics.controllers.js")
const topicsRouter = require('express').Router();

topicsRouter.get('/topics', getAllTopics)

module.exports = topicsRouter