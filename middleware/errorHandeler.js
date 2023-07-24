
const errorHandler = (err, req, rsp, next) => {
    const statusCode = err.statusCode || 500
    rsp.status(statusCode).json({
        success: 0,
        message: err.message,
        stack: err.stack,
        notfound: req.path
    })

}

module.exports = { errorHandler }
