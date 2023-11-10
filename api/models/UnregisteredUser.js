const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');  // adjust the path as needed

class UnregisteredUser extends Model {}

UnregisteredUser.init({
  submittedEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
    validate: {
      isEmail: true, // Ensure the submitted email is a valid email format
    }
  },
  pendingUserPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  requestedDate: {
    type: DataTypes.DATE,
    allowNull: true, // This can be null initially and set when sending an email verification
  },
  uniqueIdentifier: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Although we are generating the UUID in the code, we can keep this for direct database inserts
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'UnregisteredUser',
  tableName: 'pendingRegistrationRequests',
  timestamps: true, // If you want to track when the record was created and updated
  createdAt: 'requestedDate',
  updatedAt: false
});

module.exports = UnregisteredUser;