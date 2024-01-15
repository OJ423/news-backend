const {selectApiEndpoints} = require('../models/api-endpoint-model')

exports.getApiEndpoints = (req, res, next) => {
    selectApiEndpoints()
    .then((response) => {
        res.status(200).send(response)
    })
    .catch((err) => {
        next(err)
    })
}