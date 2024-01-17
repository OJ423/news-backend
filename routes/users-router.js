usersRouter = require('express').Router();
const {getAllUsers, getUserById} = require('../controllers/users.controllers.js')

usersRouter.get('/', getAllUsers)
usersRouter.get('/:username', getUserById)

module.exports = usersRouter