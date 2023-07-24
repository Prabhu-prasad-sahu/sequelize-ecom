const { user, product, cart } = require("../config/dbConnection")
const appError = require("../util/app.Error")

const addCart = async (req, rsp) => {
    let logedInUser = req.user
    let findProduct = await product.findOne({ where: { id: req.params.id } })
    if (!findProduct) throw new appError("product is not found")
    await cart.create({
        userID: logedInUser.id,
        productID: req.params.id
    })
    rsp.send("product add in cart")
}
const getallCartByUser = async (req, rsp) => {
    let logedInUser = req.user.id
    let getData = await cart.findAll({
        where: { userID: logedInUser },
        // include: [{ all: true }],

        include: [{
            model: user,
            as: "userData",
            attributes: ["Firstname", "lastname"]
            // required: false,
            // right: true
        }, {
            model: product,
            as: "productData",
            attributes: ["title", "Price"]
        }]
    })
    rsp.json({ getData })

}
const removeFromCart = async (req, rsp) => {
    let logedInUser = req.user.id
    let paramsID = req.params.id
    let findWhislist = await cart.findAll({ where: { userID: logedInUser } });
    let deleted = findWhislist.filter((data) => {
        return data.productID == paramsID;
    });
    if (!deleted) throw new appError("product not in your cart")
    await cart.destroy({ where: { id: deleted[0].id } })
    rsp.json("product removed from cart")
}
const totalPrice = async (req, rsp) => {
    let logedInUser = req.user.id
    let findCart = await cart.findAll({
        where: { userID: logedInUser },
        include: [{
            model: user,
            as: "userData",
            attributes: ["Firstname", "lastname"]
            // required: false,
            // right: true
        }, {
            model: product,
            as: "productData",
            attributes: ["title", "Price"]
        }]
    });

    let productName = []
    let totalPrice = 0
    for (let i = 0; i < findCart.length; i++) {
        productName.push({ title: findCart[i].productData.title, ProductPrice: findCart[i].productData.Price })
        totalPrice += +findCart[i].productData.Price
    }
    // rsp.json("ALL PRODUCT" >> { productName }, "total Bill" >> { totalPrice })
    rsp.json({ productName, totalPrice })
}
module.exports = { addCart, getallCartByUser, totalPrice, removeFromCart }