'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('item-tag-relationships', {
      itemId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: 'items'
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      tagId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: 'tags'
          },
          key: 'id',
        },
        allowNull: false
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('item-tag-relationships');
  }
};