const express = require("express")
const productService = require("../service/product.service")
const { isAdmin } = require("../middleware/authMiddleware")
const cookie = require("../middleware/cookies")
const idNumberController = require("../middleware/idNumberController")
const pagenation = require("../middleware/pagenation")

const router = express.Router()

router.route("/createProduct").post(cookie, productService.createProduct)
router.route("/ProductByID/:id").get(cookie, isAdmin, idNumberController, productService.getProductByID)
router.route("/filterProduct").get(cookie, pagenation, productService.filterProduct)
router.get("/getAllProduct", cookie, pagenation, async (req, rsp, next) => {
    try {
        let data = await productService.getAllProduct(req, rsp)
        rsp.status(200).send({ product: data })
    } catch (error) {
        next(error)
    }
})

router.post("/updatedByID/:id", cookie, isAdmin, async (req, rsp, next) => {
    try {
        let data = await productService.UpdateByID(req.params.id, req.body);
        rsp.send({ "updated successfully": data })
    } catch (error) {
        next(error)
    }
})
router.delete("/deleteByID/:id", cookie, isAdmin, idNumberController, async (req, rsp, next) => {
    try {
        await productService.deleteProduct(req.params.id);
        rsp.send("Product delete sucessfully")
    } catch (error) {
        next(error)
    }

})









module.exports = router