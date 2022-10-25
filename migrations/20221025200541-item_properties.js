'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('item_properties', {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4
      },
      additional_field_id: Sequelize.DataTypes.UUID,
      collection_id: Sequelize.DataTypes.UUID,
      item_id: Sequelize.DataTypes.UUID,
      value: Sequelize.DataTypes.STRING,
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
    return queryInterface.dropTable('item_properties');
  }
};
