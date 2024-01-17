usersRouter = require('express').Router();
const {getAllUsers} = require('../controllers/users.controllers.js')

usersRouter.get('/', getAllUsers)

module.exports = usersRouter