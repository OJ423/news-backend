exports.psqlErrors = (err, req, res, next) => {
    console.log(typeof err.code)
    if (err.code === "22P02") {
        res.status(400).send({msg: "Invalid data type"})
    }
    else if (err.code === "23503") {
        res.status(404).send({msg: err.detail})
    }

    else if (err.code === "23502") {
        res.status(400).send({msg: "Missing required data"})
    }
    else {
        next(err)
    }
}


exports.customErrors = (err, req, res, next) => {
    if(err.msg) res.status(err.status).send({msg: err.msg})
    else {
        next(err)
    }
}


exports.applicationErrors = (err, req, res, next) => {
    console.log(err)
    res.status(500).send({msg:'Internal Server Error'})
}