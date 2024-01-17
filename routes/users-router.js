usersRouter = require('express').Router();
const {getAllUsers} = require('../controllers/users.controllers.js')

usersRouter.get('/users', getAllUsers)

module.exports = usersRouter