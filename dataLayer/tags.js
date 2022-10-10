const { DataTypes } = require('sequelize');
const sequelize = require('../services/db');

const Tag = sequelize.define('Tag', {
    id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
})