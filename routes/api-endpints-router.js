const apiEndpointsRouter = require('express').Router();
const {getApiEndpoints} = require("../controllers/api-endpoint.controllers.js")
apiEndpointsRouter.get('/', getApiEndpoints)

module.exports = apiEndpointsRouter