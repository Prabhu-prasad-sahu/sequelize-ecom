const { Sequelize, DataTypes } = require("sequelize")


let sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.HOST,
        dialect: process.env.DIALECT,
        logging: false
    })

sequelize.authenticate()
    .then(() => {
        console.log("connected sucessfully");
    }).catch((err) => {
        console.log(err);
    })

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.DataTypes = DataTypes;
db.user = require("../model/user")(sequelize, DataTypes, db.rating)
db.product = require("../model/product.model")(sequelize, DataTypes, db.category)
db.rating = require("../model/rating.model")(sequelize, DataTypes, db.user)
db.category = require("../model/category.model")(sequelize, DataTypes)
db.wishList = require("../model/whislist.model")(sequelize, DataTypes, db.product, db.user)
db.cart = require("../model/cart.model")(sequelize, DataTypes)

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        console.info('Calling association for model >> ', modelName)
        db[modelName].associate(db);
    }
});
db.sequelize.sync({ alter: true })
module.exports = db