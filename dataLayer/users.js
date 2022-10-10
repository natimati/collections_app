const { DataTypes } = require('sequelize');
const sequelize = require('../services/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    autoIncrement: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.TEXT,
  salt: DataTypes.STRING,
  is_admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  registration_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  last_login_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
}, { timestamps: false });

module.exports = User;
