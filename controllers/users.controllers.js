const {selectAllUsers, selectUserById} = require('../models/users.models')

exports.getAllUsers = (req, res, next) => {
    selectAllUsers()
    .then((users) => {
        res.status(200).send({users})
    })
    .catch((err) => {
        next(err)
    })
}

exports.getUserById = (req, res, next) => {
    const {username} = req.params
    selectUserById(username)
    .then((user) => {
        res.status(200).send({user})
    })
    .catch((err) => {
        next(err)
    })
}