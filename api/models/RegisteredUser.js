const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database'); 

class RegisteredUser extends Model {}

RegisteredUser.init({
  verifiedEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true  // Set as primary key if this is your primary key field
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountType: {
    type: DataTypes.BOOLEAN,
  },
}, {
  sequelize,
  modelName: 'RegisteredUser',
  tableName: 'registeredUser',
  timestamps: true,  // Explicitly enable timestamps
  createdAt: 'createdAt',  // Explicitly specify createdAt field
  updatedAt: 'updatedAt'  // Explicitly specify updatedAt field
});



module.exports = RegisteredUser;