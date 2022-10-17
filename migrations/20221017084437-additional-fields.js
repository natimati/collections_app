'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('additional_field', {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4
      },
      name: Sequelize.DataTypes.STRING,
      type: Sequelize.DataTypes.STRING,
      collection_id: Sequelize.DataTypes.UUID,
      body: Sequelize.DataTypes.TEXT,
      created_at: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('additional_field');
  }
};
