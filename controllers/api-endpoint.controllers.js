const {selectApiEndpoints} = require('../models/api-endpoint-models')

exports.getApiEndpoints = (req, res, next) => {
    selectApiEndpoints()
    .then((response) => {
        res.status(200).send({endpoints:response})
    })
    .catch(next)
}
