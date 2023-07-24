const express = require("express")
const router = express.Router()
const cartService = require("../service/cart.service")
const cookies = require("../middleware/cookies")
router.post("/addCart/:id", cookies, async (req, rsp, next) => {
    try {
        await cartService.addCart(req, rsp)
    } catch (error) {
        next(error)
    }
})
router.get("/getallCartByUser", cookies, async (req, rsp, next) => {
    try {
        await cartService.getallCartByUser(req, rsp)
    } catch (error) {
        next(error)
    }
})
router.delete("/removeFromCart/:id", cookies, async (req, rsp, next) => {
    try {
        await cartService.removeFromCart(req, rsp)
    } catch (error) {
        next(error)
    }
})
router.get("/totalPrice", cookies, async (req, rsp, next) => {
    try {
        await cartService.totalPrice(req, rsp)
    } catch (error) {
        next(error)
    }
})
module.exports = router