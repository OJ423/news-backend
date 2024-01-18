const {db} = require('../db/connection')

exports.selectAllTopics = () => {
    return db.query(`SELECT * FROM topics`)
    .then(({rows}) => {
        if (rows.length === 0 ) {
            return Promise.reject({msg: 'There are no topics in the database'})
        }
        return rows
    })
}

exports.addNewTopic = (slug, description) => {
    return db.query(`
        INSERT INTO topics
        (slug, description)
        VALUES
        ($1, $2)
        RETURNING *`, [slug, description])
    .then(({rows}) => {
        return rows[0]
    })
}