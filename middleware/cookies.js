const { user } = require("../config/dbConnection");
const asyncHandler = require("express-async-handler")
const JWT = require("jsonwebtoken")


const cookies = asyncHandler(async (req, rsp, next) => {
    let cookie = req.cookies;
    if (!cookie.cookiestoken) {
        throw new Error("please login  again")
    }
    const refreshToken = cookie.cookiestoken
    let token = JWT.verify(refreshToken, process.env.JWT_SECRET)
    if (!token) {
        throw new Error("invalid token")
    }
    try {
        if (token) {
            const User = await user.findOne({ where: { id: token.id } })
            if (User.cookiestoken == refreshToken) {
                req.user = User
                next()
            }
        }
    } catch (error) {
        throw new Error("not Authorized Token Expaired !! login again😂😂😂😂😂")
    }
})
module.exports = cookies