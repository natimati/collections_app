const { DataTypes } = require('sequelize');
const sequelize = require('../services/db');

const Collection = sequelize.define('Collection', {
  id: {
    type: DataTypes.UUID,
    autoIncrement: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  author_id: DataTypes.UUID,
  name: DataTypes.STRING,
  topic: DataTypes.STRING,
  description: DataTypes.TEXT,
  image_url: DataTypes.STRING,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  edited: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  additional_fields: DataTypes.JSON
});

module.exports = Collection;