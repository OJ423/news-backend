commentsRouter = require('express').Router();
const {deleteCommentById} = require("../controllers/comments.controllers")

commentsRouter.delete('/comments/:comment_id', deleteCommentById)

module.exports = commentsRouter