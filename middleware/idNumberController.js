const appError = require("../util/app.Error")

module.exports = (req, rsp, next) => {
    let reqId = Number.parseInt(req.params.id)
    if (Number.isNaN(reqId)) {
        // return rsp.status(400).json({ "message": "id is a number not a string" })
        throw new appError("id is not a number", 400)
    }
    next()
}