const express = require("express")
const router = express.Router()
const whisListService = require("../service/whislist.service")
const cookies = require("../middleware/cookies")
router.get("/getAllWhislist", cookies, async (req, rsp, next) => {
    try {
        await whisListService.getAllWhislist(req, rsp)
    } catch (error) {
        next(error)
    }
})

router.post("/createWhislist/:id", cookies, async (req, rsp, next) => {
    try {
        await whisListService.createWhislist(req, rsp)
    } catch (error) {
        next(error)
    }
})
router.get("/getLoginWhisList", cookies, async (req, rsp, next) => {
    try {
        await whisListService.getLoginWhisList(req, rsp)
    } catch (error) {
        next(error)
    }
})
router.delete("/removeWhisList/:id", cookies, async (req, rsp, next) => {
    try {
        console.log(">>>");
        await whisListService.removeWhisList(req, rsp)
    } catch (error) {
        next(error)
    }
})
router.post("/whisListToCart", cookies, async (req, rsp, next) => {
    try {
        await whisListService.whisListToCart(req, rsp)
    } catch (error) {
        next(error)
    }
})

module.exports = router