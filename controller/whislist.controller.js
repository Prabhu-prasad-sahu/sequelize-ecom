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
router.get("/totalPrice", cookies, async (req, rsp, next) => {
    try {
        await whisListService.totalPrice(req, rsp)
    } catch (error) {
        next(error)
    }
})

module.exports = router