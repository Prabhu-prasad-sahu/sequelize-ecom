
const asyncHandler = require("express-async-handler")
const JWT = require("jsonwebtoken")
const { user } = require("../config/dbConnection")


const authMiddleware = asyncHandler(async (req, rsp, next) => {
    let authHeader = req.headers.Authorization || req.headers.authorization
    if (authHeader) {
        let token = JWT.verify(authHeader.split(' ')[1], process.env.JWT_SECRET)
        if (!token) {
            throw new Error("invalid token")
        }
        try {
            if (token) {
                const User = await user.findOne({ where: { id: token.id } })
                req.user = User

                next()
            }
        } catch (error) {
            throw new Error("not Authorized Token Expaired !! login again")
        }

    } else {
        throw new Error("There is no token attached in the header")
    }
})
const isAdmin = asyncHandler(async (req, rsp, next) => {
    const { email } = req.user
    const loginUser = await user.findOne({ where: { email } })
    const getUser = await user.findOne({ where: { id: req.params.id } })
    if (loginUser.role == "admin" || loginUser.id == getUser.id) {
        next()
    }
    else {
        throw new Error(`only ${getUser.Firstname} can access it`)
    }
})


module.exports = { authMiddleware, isAdmin }