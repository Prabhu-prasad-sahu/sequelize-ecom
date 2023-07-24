const bcrypt = require("bcrypt")
module.exports = (sequelize, DataTypes) => {
    let user = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        }, Firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        mobileNo: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        wishList: {
            type: DataTypes.INTEGER
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: "user",
            values: ['admin', 'guest']
        },
        isVerifyed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isBolocked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        cookiestoken: {
            type: DataTypes.STRING
        }
    }, {
        createdAt: true,
        updatedAt: false,
    })
    user.beforeCreate(async (user) => {
        if (user.password) {
            const salt = await bcrypt.genSaltSync(10, 'a');
            user.password = bcrypt.hashSync(user.password, salt);
        }
    })

    user.beforeBulkUpdate(async (user, options) => {
        console.log(">>>>");
        if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    });
    user.beforeUpdate(async (user, options) => {
        console.log('beforeUpdate hook called');
        // Hook logic here
    });


    user.associate = (models) => {
        // user.hasMany(models.rating, {
        //     foreignKey: 'UserId',
        //     as: "userdetails",
        // })
        user.hasMany(models.wishList, {
            foreignKey: 'userID',
            as: "userDetails",
        })
        user.hasMany(models.cart, {
            foreignKey: 'userID',
            as: "userData",
        })
    }
    return user
}