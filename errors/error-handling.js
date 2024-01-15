exports.customErrors = (err, req, res, next) => {
    if(err.msg) return {msg: err.msg}
    else {
        next(err)
    }
}
exports.applicationErrors = (err, req, res, next) => {
    console.log(err)
    res.status(500).send({msg:'Internal Server Error'})
}