let express = require('express')
const router = express.Router()
const categoryService = require("../service/category.service")
router.get("/getAllCategory", async (req, rsp, next) => {
    try {
        await categoryService.getAllCategory(req, rsp)
    } catch (error) {
        next(error)
    }
})
router.get("/getAllCategory/:id", async (req, rsp, next) => {
    try {
        await categoryService.getCategoryByID(req, rsp)
    } catch (error) {
        next(error)
    }
})
router.post("/createCategory", async (req, rsp, next) => {
    try {
        await categoryService.createCategory(req, rsp)
    } catch (error) {
        next(error)
    }
})
router.put("/updateCategory/:id", async (req, rsp, next) => {
    try {
        await categoryService.updateCategory(req, rsp)
    } catch (error) {
        next(error)
    }
})
router.delete("/deleteCategory/:id", async (req, rsp, next) => {
    try {
        await categoryService.deleteCategory(req, rsp)
    } catch (error) {
        next(error)
    }
})
router.get("/categoryByproductByID/:id", async (req, rsp, next) => {
    try {
        await categoryService.categoryByproductByID(req, rsp)
    } catch (error) {
        next(error)
    }
})
router.get("/categoryByproduct", async (req, rsp, next) => {
    try {
        await categoryService.categoryByproduct(req, rsp)
    } catch (error) {
        next(error)
    }
})
module.exports = router