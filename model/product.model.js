const { product } = require("../config/dbConnection")

module.exports = (sequelize, DataTypes) => {
    let Product = sequelize.define("Product", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        }, title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }, slug: {
            type: DataTypes.STRING,
            allowNull: false,
        }, description: {
            type: DataTypes.STRING,
            allowNull: false,
        }, image: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        }, brand: {
            type: DataTypes.STRING,
            values: ['apple', 'Sumsung', 'oneplus']
        }, Price: {
            type: DataTypes.STRING,
            allowNull: false,
        }, Quantity: {
            type: DataTypes.INTEGER,
        }, sold: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }, color: {
            type: DataTypes.STRING,
            values: ['Black', 'Brown', 'Red']
        }, categoryID: {
            type: DataTypes.INTEGER
        }
    }, {
        createdAt: true,
        updatedAt: false,
    })
    Product.associate = (models) => {
        Product.hasMany(models.rating, {
            foreignKey: 'productRatingID',
            as: "productRating",
        })
        Product.belongsTo(models.category, {
            foreignKey: "categoryID",
            as: "categoryDetails"
        })
        Product.hasMany(models.wishList, {
            foreignKey: "productID",
            as: "productDetails"
        })
        Product.hasMany(models.cart, {
            foreignKey: "productID",
            as: "productData"
        })
    }
    return Product
}