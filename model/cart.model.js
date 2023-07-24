
module.exports = (sequelize, DataTypes) => {
    let cart = sequelize.define("cart", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        }, userID: {
            type: DataTypes.INTEGER,
        }, productID: {
            type: DataTypes.INTEGER
        }
    }, {
        createdAt: true,
        updatedAt: false,
    })
    cart.associate = (models) => {
        cart.belongsTo(models.user, {
            foreignKey: 'userID',
            as: "userData",
        })
        cart.belongsTo(models.product, {
            foreignKey: "productID",
            as: "productData"
        })
    }
    return cart;
}
