const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt")
const { user } = require("../config/dbConnection");
const { generateToken } = require("../middleware/JWTtoken");
const JWT = require("jsonwebtoken")
const appError = require("../util/app.Error");
const sendEmail = require("../util/nodeMailer");






let findByEmail = async (email) => {
    let getEmail = await user.findOne({ where: { email: email } })
    return getEmail
}

let getUser = asyncHandler(async (req, rsp, next) => {
    let cookie = req.cookies;
    if (!cookie) {
        throw new appError("please LOGIN😁😁😁")
    }
    let User = await user.findAll()
    if (!User) {
        throw new appError("user not found")
    }

    rsp.send(User)
})

let registerUser = asyncHandler(async (req, rsp, next) => {
    let email = req.body.email
    const findUser = await user.findOne({ where: { email: email } })
    if (findUser) {
        throw new appError("User already exist");
    }
    const tempUser = {
        Firstname: req.body.Firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        mobileNo: req.body.mobileNo,
        password: req.body.password,
        role: req.body.role
    };
    let createdUser = await user.create(tempUser)
    let token = generateToken(createdUser.id)
    if (createdUser == null) {
        return rsp.json("something is wrong")
    }
    const resetUrl = `Hi , Please Varify your Email .<br>
    This link is valid till 10 mints From now .<br> <a href = "http://localhost:8000/user/emailVarification?verify=${token}">Click here</> `
    let sendData = {
        to: req.body.email,
        subject: "Varify Email",
        htm: resetUrl,
    }
    sendEmail(sendData)
    rsp.status(200).json({ CreatedUser: createdUser, emailVerificationToken: token, message: "please Varify your Email" })

})

const LoginUser = async (req, rsp) => {

    const { email, password } = req.body
    let findEmail = await user.findOne({
        where: {
            email: email
        }
    })
    if (!findEmail) {
        throw new appError("user is not exist please go register user")
    }
    if (!password) {
        throw new appError("please give password")
    }
    if (findEmail.isVerifyed !== true) {
        throw new appError("Please user is not verifyed ")
    }
    if (findEmail && (await bcrypt.compareSync(password, findEmail.password))) {
        const refreshToken = await generateToken(findEmail.id)
        await user.update({ cookiestoken: refreshToken }, { where: { id: findEmail.id } })
        return rsp.cookie("cookiestoken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000
        })
            .status(200)
            .json({
                id: findEmail.id,
                Firstname: findEmail?.Firstname,
                lastname: findEmail?.lastname,
                email: findEmail?.email,
                mobileNo: findEmail?.mobileNo,
                Token: generateToken(findEmail?.id)
            })
        // return rsp.status(200).json("login successfully")
    } else {
        rsp.clearCookie("cookiestoken", {
            httpOnly: true,
            secure: true
        })
        throw new appError("password is incorrect")
    }
}

let getUserById = asyncHandler(async (req, rsp) => {
    let User = await user.findOne({
        where: {
            id: req.params.id
        }
    })

    if (!User) {
        throw new appError("user doesn't exist")
    }
    rsp.status(200).json({ user: User })
})

let deleteUser = asyncHandler(async (req, rsp) => {
    let findUser = await user.findOne({ where: { id: req.params.id } })
    if (!findUser) {
        throw new appError("user doesn't exist")
    }
    const User = await user.destroy({ where: { id: req.params.id } })
    rsp.status(200).json(`user deleted Successfully`)
})

const handeleRefreshToken = asyncHandler(async (req, rsp) => {
    const cookie = req.cookies;
    if (!cookie.cookiestoken) {
        throw new appError("no refresh token in Cookies")
    }
    const refreshToken = cookie.cookiestoken
    const getUser = await user.findOne({ where: { cookiestoken: refreshToken } })
    if (!getUser) throw new Error("no refresh Token present in db or not matched")
    JWT.verify(refreshToken, process.env.JWT_SECRET, (err, decode) => {
        if (err || getUser.id !== decode.id) {
            throw new appError("something is wrong in your refresh Token")
        }
        const accessToken = generateToken(getUser.id)
        rsp.send({ accessToken })
    })
    // console.log(getUser);
})

const logOut = asyncHandler(async (req, rsp) => {
    let cookie = req.cookies;
    if (!cookie.cookiestoken) {
        throw new appError("PLEASE LOGIN 😒😒😒😒")
    }
    const refreshToken = cookie.cookiestoken
    const getUser = await user.findOne({ where: { cookiestoken: refreshToken } })
    if (!getUser) {
        rsp.clearCookie("cookiestoken", {
            httpOnly: true,
            secure: true
        }).json("PLEASE 🙌 login Again")
        // return rsp.sendStatus(204)
    }
    await user.update({ cookiestoken: " " }, { where: { cookiestoken: refreshToken } })
    rsp.clearCookie("cookiestoken", {
        httpOnly: true,
        secure: true
    }).json("logout sucessfully")
    // rsp.status(204).json("logout sucessfully")
})

const updateUser = asyncHandler(async (req, rsp) => {
    let findUser = await user.findOne({ where: { id: req.params.id } })
    if (findUser == null) {
        throw new appError("user dosnt exist")
    } else {
        const detailsUser = {
            Firstname: req.body.Firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            mobileNo: req.body.mobileNo
        }
        // console.log(req.user);
        await user.update(detailsUser, {
            where: { id: req.params.id || req.user.id }
        }, { returning: true })
        return rsp.status(200).json({ updateduser: detailsUser })
    }
})

const isBlocked = asyncHandler(async (req, rsp) => {
    let { id } = req.params
    let userById = await user.findByPk(id)
    if (!userById) {
        throw new appError("id is not found")
    }
    await user.update(
        { "isBolocked": "true" },
        { where: { id: req.params.id } }
    )
    rsp.status(200).json("id blocked")

})

const isUnblocked = asyncHandler(async (req, rsp) => {
    let { id } = req.params
    let userById = await user.findByPk(id)
    if (!userById) {
        throw new appError("id is not found")
    }
    await user.update(
        { "isBolocked": "false" },
        { where: { id: req.params.id } }
    )
    rsp.status(200).json("id UNBLOCKED")

})

const updatePassword = async (req, rsp) => {
    const { password } = req.body
    const salt = await bcrypt.genSalt(10);
    const createdPassword = await bcrypt.hash(password, salt);
    let getUser = await user.update({ password: createdPassword }, { where: { id: req.user.id } })
    if (!getUser) {
        throw new appError("please login")
    }

    return rsp.status(200).json("update password sucessfully")
}

const ForgetPasswordToken = async (req, rsp, next) => {
    let queryEmail = req.query.email
    const getUser = await user.findOne({ where: { email: queryEmail } })
    if (!getUser) throw new appError("user not exist")
    let token = await generateToken(getUser.id)
    const resetUrl = `Hi , Please follow the link to reset your Password .<br>
         This link is valid till 10 mints From now .<br> <a href = "http://localhost:8000/user/resetPassword/${token}">Click here</> `
    let sendData = {
        to: queryEmail,
        subject: "Forget Password link",
        htm: resetUrl,
    }
    sendEmail(sendData)
    rsp.json(token)
}

const resetPassword = async (req, rsp) => {
    let getParama = req.params.code
    let { password } = req.body
    let verifyUser = JWT.verify(getParama, process.env.JWT_SECRET)
    let getUser = await user.findByPk(verifyUser.id)
    if (!getUser) {
        throw new appError("user Doesnt exist")
    }
    const salt = await bcrypt.genSalt(10);
    let savePassword = await bcrypt.hash(password, salt);
    await user.update({ password: savePassword }, { where: { id: getUser.id } })
    rsp.json("Sucessfully Password Updated")

}

const emailVarification = async (req, rsp) => {
    let queryDetails = req.query.verify
    let getQuery = JWT.verify(queryDetails, process.env.JWT_SECRET)
    let getUser = await user.findByPk(getQuery.id)
    if (!getUser) { throw new appError("Please register again") }
    await user.update({ isVerifyed: true }, { where: { id: getUser.id } })
    rsp.json("email verification Sucessfully")
}
module.exports = {
    getUser, registerUser, LoginUser, getUserById, deleteUser, updateUser, isBlocked,
    isUnblocked, handeleRefreshToken, logOut, findByEmail, updatePassword, ForgetPasswordToken, resetPassword, emailVarification
}