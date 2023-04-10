const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')
const bcrypt = require('bcrypt')

class User extends Model {
    checkPassword (pwd){
        return bcrypt.compareSync(pwd, this.password )
    }
}


User.init({
    id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }

}, {
    hooks: {
        async beforeCreate(newUserData){
            newUserData.password = await bcrypt.hash(newUserData.password, 10)
            return newUserData
        },
        async beforeUpdate(userData){
            userData.password = await bcrypt.hash(userData.password, 10)
            return userData
        }
    },
   sequelize,
   timestamps: false,
   freezeTableName: true,
   underscored: true,
   modelName: 'user'
}
)
module.exports = User