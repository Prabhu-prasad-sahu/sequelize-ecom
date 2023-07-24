const { wishList, user, product } = require("../config/dbConnection");
const appError = require("../util/app.Error");

getAllWhislist = async (req, rsp) => {
    const getWhislist = await wishList.findAll()
    rsp.json(getWhislist)
}

createWhislist = async (req, rsp) => {
    let logedInUser = req.user
    await wishList.create({
        userID: logedInUser.id,
        productID: req.params.id
    })
    rsp.send("whislist created")
}
const getLoginWhisList = async (req, rsp) => {
    let logedInUser = req.user.id
    let getData = await wishList.findAll({
        where: { userID: logedInUser },
        // include: [{ all: true }],

        include: [{
            model: user,
            as: "userDetails",
            attributes: ["Firstname", "lastname"]
            // required: false,
            // right: true
        }, {
            model: product,
            as: "productDetails",
            attributes: ["title", "Price"]
        }]
    })
    rsp.json({ getData })

}
const removeWhisList = async (req, rsp) => {
    let logedInUser = req.user.id
    let paramsID = req.params.id
    let findWhislist = await wishList.findAll({ where: { userID: logedInUser } });
    let deleted = findWhislist.filter((data) => {
        return data.productID == paramsID;
    });
    if (!deleted) throw new appError("product not in your whisList")
    await wishList.destroy({ where: { id: deleted[0].id } })
    rsp.json("remove from your whislist")
}

module.exports = { getAllWhislist, createWhislist, getLoginWhisList, removeWhisList }

