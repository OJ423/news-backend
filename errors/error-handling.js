exports.customErrors = (err, req, res, next) => {
    if(err.msg === 'There are no topics in the database') {
        return {msg: 'There are no topics in the database'}
    }
    else {
        next(err)
    }
}
exports.applicationErrors = (err, req, res, next) => {
    console.log(err)
    res.status(500).send({msg:'Internal Server Error'})
}