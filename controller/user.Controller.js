const express = require("express");
let router = express.Router()
const userService = require("../service/user.service");
const { isAdmin } = require("../middleware/authMiddleware");
const cookies = require("../middleware/cookies");
const { check, validationResult } = require("express-validator");
const checkParam = require("../middleware/idNumberController");
const user = require("../model/user");

//if use cookies you no need to send bearer token in Authorization it automatically find the bearerToken in cookiestoken 
//is are you use authMiddleware then you need to send  bearer token in Authorization
// router.route("/getUser").get(cookies, userService.getUser)
router.get("/getUser", cookies, async (req, rsp, next) => {
    try {
        await userService.getUser(req, rsp)
    } catch (error) {
        next(error)
    }
})


router.post("/registerUser", async (req, rsp, next) => {
    try {
        await userService.registerUser(req, rsp)
    } catch (error) {
        next(error)
    }
})

router.get("/logOut", async (req, rsp, next) => {
    try {
        await userService.logOut(req, rsp)
    } catch (error) {
        next(error)
    }
})

router.get("/getUserById/:id", checkParam, cookies, async (req, rsp, next) => {
    try {
        await userService.getUserById(req, rsp)
    } catch (error) {
        next(error)
    }
})
router.delete("/deleteUser/:id", checkParam, cookies, isAdmin, async (req, rsp, next) => {
    try {
        await userService.deleteUser(req, rsp)
    } catch (error) {
        next(error)
    }
})

router.put("/updateUser/:id", checkParam, cookies, isAdmin, async (req, rsp, next) => {
    try {
        await userService.updateUser(req, rsp)
    } catch (error) {
        next(error)
    }
})

router.post("/isBlocked/:id", checkParam, async (req, rsp, next) => {
    try {
        await userService.isBlocked(req, rsp)
    } catch (error) {
        next(error)
    }
})
router.post("/isUnblocked/:id", checkParam, cookies, isAdmin, async (req, rsp, next) => {
    try {
        await userService.isUnblocked(req, rsp)
    } catch (error) {
        next(error)
    }
})
router.get("/cookie", async (req, rsp, next) => {
    try {
        await userService.handeleRefreshToken(req, rsp)
    } catch (error) {
        next(error)
    }
})
router.put("/updatepassword", async (req, rsp, next) => {
    try {
        await userService.updatePassword(req, rsp)
    } catch (error) {
        next(error)
    }
})

router.put("/ForgetPasswordToken", cookies, async (req, rsp, next) => {
    try {
        await userService.ForgetPasswordToken(req, rsp)
    } catch (error) {
        next(error)
    }
})

router.put("/resetPassword/:code", async (req, rsp, next) => {
    try {
        await userService.resetPassword(req, rsp)
    } catch (error) {
        next(error)
    }
})
router.post("/emailVarification", async (req, rsp, next) => {
    try {
        await userService.emailVarification(req, rsp)
    } catch (error) {
        next(error)
    }
})

router.post("/login",
    check("email")
        .notEmpty().withMessage("please enter your email address")
        .bail()  // used for if notEmpty() empty it will throw error 
        .isEmail().withMessage("must be valid email address ")
        // .custom(async (email) => {
        //     const getEmail = await userService.findByEmail(email)
        //     if (!getEmail) {
        //         throw new Error("please login from register Email")
        //     }
        // })
        .bail(),
    check("password")
        .notEmpty().withMessage("please input your password ")
        .bail()
        .isLength({ min: 3, max: 5 }).withMessage("password must be min 3 and max 4 characters ")
    , async (req, rsp, next) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return rsp.status(400).send(errors.array())
            }
            let getUser = await userService.LoginUser(req, rsp)
            // rsp.send(getUser)
        } catch (error) {
            rsp.clearCookie("cookiestoken", {
                httpOnly: true,
                secure: true
            })
            next(error)
        }
    })


module.exports = router 