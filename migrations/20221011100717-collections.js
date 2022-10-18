'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('collections', {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4
      },
      author_id: Sequelize.DataTypes.UUID,
      name: Sequelize.DataTypes.STRING,
      topic: Sequelize.DataTypes.STRING,
      description: Sequelize.DataTypes.TEXT,
      image_url: Sequelize.DataTypes.STRING,
      created_at: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW
      },
      additional_fields: Sequelize.DataTypes.JSON
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('collections');
  }
};
