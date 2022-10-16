'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('tag', {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4
      },
      name: Sequelize.DataTypes.STRING,
    });
  },

  async down (queryInterface) {
    return queryInterface.dropTable('tag');
  }
};
