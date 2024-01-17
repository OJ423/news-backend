const {removeCommentById, updateCommentById} = require('../models/comments.models')

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

exports.patchCommentById = (req, res, next) => {
    const {comment_id} = req.params;
    const { inc_votes } = req.body

    updateCommentById(comment_id, inc_votes)
    .then((comment) => {
        res.status(200).send({comment})
    })
    .catch((err) => {
        next(err)
    })
}