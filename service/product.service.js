const { product, rating, category } = require("../config/dbConnection");
const user = require("../model/user");
const appError = require("../util/app.Error");

const createProduct = async (req, rsp, next) => {
    try {
        let getcategory = await category.findOne({ where: { id: req.body.categoryID } })
        if (!getcategory) throw new appError("category is not found")
        const getproduct = await product.create({
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            image: req.body.image,
            brand: req.body.brand,
            Price: req.body.Price,
            Quantity: req.body.Quantity,
            sold: req.body.sold,
            color: req.body.color,
            categoryID: req.body.categoryID,
            productRating: {
                star: req.body.star,
                UserId: req.user.id
            }
        }, {
            include: [{
                model: rating,
                as: 'productRating'
            }]
        })
        if (getproduct) {
            return rsp.status(200).json({ CreatedProduct: getproduct })
        }

        throw new appError("not created", 400)
    } catch (error) {
        next(error)
    }
}

const getAllProduct = async (req, rsp, next) => {
    try {
        let allproduct = await product.findAndCountAll({
            // include: [{ all: true }],
            where: req.query, include: [{
                model: rating,
                as: "productRating",
                required: false,
                right: true
            }, {
                model: category,
                as: 'categoryDetails',
                required: false,
            }]
        })
        if (!allproduct) {
            throw new appError("no product", 400)
        }
        return allproduct
        // rsp.status(200).json({ product: allproduct })

    } catch (error) {
        throw new appError(error)
    }
}

const getProductByID = async (req, rsp, next) => {
    try {
        const reqID = req.params.id
        const findProduct = await product.findByPk(reqID)
        if (!findProduct) {
            throw new appError("invalid Product ID", 400)
        }
        rsp.status(200).json({ productDetails: findProduct })
    } catch (error) {
        next(error)
    }
}

const UpdateByID = async (reqID, reqBody) => {
    console.log(reqID);
    console.log(reqBody);
    let findProduct = await product.findOne({ where: { id: reqID } })
    if (findProduct == null) {
        throw new appError("user dosnt exist", 404)
    }
    if (!findProduct) {
        throw new appError("Product not Found", 404)
    }
    else {
        const updateProduct = await product.update(reqBody, {
            where: { id: reqID }
        }, { returning: true })
        return updateProduct
    }
}

const deleteProduct = async (reqID) => {
    // let reqID = req.params.id
    let findProduct = await product.findOne({ where: { id: reqID } })
    if (!findProduct) {
        throw new appError("Product doesn't exist", 404)
    }
    await product.destroy({ where: { id: reqID } })
}

let filterProduct = async (req, rsp, next) => {
    try {
        const { size, page, Sort } = req.pagenation   // comeing from pagenationmiddleware
        const getProduct = await product.findAndCountAll({
            limit: size,
            offset: page * size,
            order: [
                [Sort, 'ASC'],  // (DESC ,ASC )
            ],
            include: [{
                model: rating,
                as: "productRating",
                required: false,
                // right: true
            }]
        })

        if (!getProduct) {
            throw new appError("no product")
        }
        rsp.status(200).json({
            content: getProduct.rows,
            totalProduct: getProduct.count,
            totalpage: getProduct.count / 2
        })
    } catch (error) {
        next(error)
        // console.log(error);
    }

}


module.exports = { createProduct, getAllProduct, getProductByID, UpdateByID, deleteProduct, filterProduct }