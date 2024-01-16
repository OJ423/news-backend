const {removeCommentById} = require('../models/comments.models')

exports.deleteCommentById = (req, res, next) => {
    const {comment_id} = req.params;
    removeCommentById(comment_id)
    .then((response) => {
        res.status(204).send()
    })
    .catch((err) => {
        next(err)
    })
}