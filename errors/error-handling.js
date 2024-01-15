exports.customErrors = (err, req, res, next) => {
    if(err.msg) return res.status(err.status).send({msg: err.msg})
    else {
        next(err)
    }
}

exports.psqlErrors = (err, req, res, next) => {
    if (err.code = "22P02") {
        res.status(400).send({msg: "Invalid data type"})
    }
}

exports.applicationErrors = (err, req, res, next) => {
    console.log(err)
    res.status(500).send({msg:'Internal Server Error'})
}