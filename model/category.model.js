
module.exports = (sequelize, DataTypes) => {
    let Category = sequelize.define("Category", {
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
        },
    })
    Category.associate = (models) => {
        Category.hasMany(models.product, {
            foreignKey: "categoryID",
            as: "categoryByproduct"
        })
    }
    return Category;
}