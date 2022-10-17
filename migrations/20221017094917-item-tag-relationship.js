'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('item-tag-relationship', {
      itemId: Sequelize.DataTypes.UUID,
      tagId: Sequelize.DataTypes.UUID,
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('item-tag-relationship');
  }
};