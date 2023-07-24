
module.exports = (sequelize, DataTypes) => {
    let rating = sequelize.define("rating", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        }, star: {
            type: DataTypes.INTEGER,
        }, productRatingID: {
            type: DataTypes.INTEGER
        }
    }, {
        createdAt: true,
        updatedAt: false,
    })
    rating.associate = (models) => {
        rating.belongsTo(models.product, {
            foreignKey: 'productRatingID',
            as: "productRating",
        })
        rating.belongsTo(models.user, {
            foreignKey: 'UserId',
            as: "userdetails",
        })
    }
    return rating;
}
