const { db } = require("../db/connection");

exports.removeCommentById = (commentId) => {
    return db.query(`
        DELETE FROM comments
        WHERE comment_id = $1
        RETURNING *`, [commentId])
    .then(({rows}) => {
        if (rows.length === 0) {
            return Promise.reject({status:404, msg: "Comment does not exist"})
        }
    })
}

exports.updateCommentById = (commentId, votes) => {
    return db.query(`
    UPDATE comments
    SET votes = votes + $1
    WHERE comment_id = $2
    RETURNING *`,[votes, commentId])
  .then(({rows}) => {
    if(rows.length === 0) return Promise.reject({status:404, msg: "Comment does not exist"})
    return rows[0]
  })
}