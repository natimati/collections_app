'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('item', {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4
      },
      collection_id: Sequelize.DataTypes.STRING,
      author_id: Sequelize.DataTypes.UUID,
      name: Sequelize.DataTypes.STRING,
      image_url: Sequelize.DataTypes.STRING,
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
    return queryInterface.dropTable('item');
  }
};
