
module.exports = (sequelize, DataTypes) => {
    let wishList = sequelize.define("wishList", {
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
    wishList.associate = (models) => {
        wishList.belongsTo(models.user, {
            foreignKey: 'userID',
            as: "userDetails",
        })
        wishList.belongsTo(models.product, {
            foreignKey: "productID",
            as: "productDetails"
        })
    }
    return wishList;
}
