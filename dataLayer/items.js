const { DataTypes } = require('sequelize');
const sequelize = require('../services/db');

const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.UUID,
    autoIncrement: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  collection_id: DataTypes.STRING,
  author_id: DataTypes.STRING,
  name: DataTypes.STRING,
  image_url: DataTypes.STRING,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  edited: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
});

module.exports = Item;