'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('colections', {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4
      },
      author: Sequelize.DataTypes.STRING,
      name: Sequelize.DataTypes.STRING,
      topis: Sequelize.DataTypes.STRING,
      desctiprion: Sequelize.DataTypes.TEXT,
      image_url: Sequelize.DataTypes.STRING,
      created_at: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW
      },
      updated: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW
      },
      additional_fields: Sequelize.DataTypes.JSON
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('colections');
  }
};
