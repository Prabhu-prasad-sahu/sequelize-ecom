const { category, product, rating, user } = require("../config/dbConnection")
const appError = require("../util/app.Error")

let getAllCategory = async (req, rsp) => {
    try {
        let getCategory = await category.findAll()
        rsp.send({ availabelData: getCategory })
    } catch (error) {
        throw new appError(error)
    }
}
let getCategoryByID = async (req, rsp) => {
    try {
        let getCategory = await category.findOne({ where: { id: req.params.id } })
        rsp.json({ category: getCategory })
    } catch (error) {
        throw new appError(error)
    }
}
let createCategory = async (req, rsp) => {
    console.log(req.body);
    try {
        await category.create({
            title: req.body.title
        })
        rsp.json("created category sucessfully")
    } catch (error) {
        throw new appError(error)
    }
}
let updateCategory = async (req, rsp) => {
    let paramsId = req.params.id
    let getcategory = await category.findOne({ where: { id: paramsId } })
    if (!getcategory) throw new appError("category not found")
    try {
        let data = req.body
        await category.update(data, { where: { id: paramsId } })
        rsp.json("update category sucessfully")
    } catch (error) {
        throw new appError(error)
    }
}
let deleteCategory = async (req, rsp) => {
    let paramsId = req.params.id
    let getcategory = await category.findOne({ where: { id: paramsId } })
    if (!getcategory) throw new appError("category ID not found")
    try {
        await category.destroy({ where: { id: paramsId } })
        rsp.json("deleted category sucessfully")
    } catch (error) {
        throw new appError(error)
    }
}
let categoryByproductByID = async (req, rsp) => {
    let getcategory = await category.findOne({ where: { id: req.params.id } })
    if (!getcategory) throw new appError("category not found")
    let categoryByProduct = await category.findAndCountAll({
        where: { id: req.params.id },
        attributes: ["title"],

        include: [{
            model: product,
            as: "categoryByproduct",
            required: false,
            right: false,
            attributes: ["title", "slug", "description", "brand", "Price", "color"],
            include: [{
                model: rating,
                as: "productRating",
                required: false,
                right: false,
                attributes: ["star", "UserId"]
            }]
        }],
    })
    rsp.json({ data: categoryByProduct })

}
let categoryByproduct = async (req, rsp) => {
    let categoryByProduct = await category.findAndCountAll({
        include: [{
            model: product,
            as: "categoryByproduct",
            required: false,
            right: false,
            attributes: ["title"],
            include: [{
                model: rating,
                as: "productRating",
                required: false,
                right: false,
                attributes: ["star", "UserId"],
                include: [{
                    model: user,
                    as: "userDetails",
                    // required: false,
                    // right: false,
                    // attributes: ["star", "UserId"]
                }]
            }]
        }],
    })
    rsp.json({ data: categoryByProduct })
}
module.exports = { createCategory, getAllCategory, updateCategory, deleteCategory, getCategoryByID, categoryByproduct, categoryByproductByID }