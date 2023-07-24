const JWt = require("jsonwebtoken")

const generateToken = (id) => {
    return JWt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "8h" })
}
module.exports = { generateToken }