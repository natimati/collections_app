'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('comments', {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4
      },
      item_id: Sequelize.DataTypes.UUID,
      author_id: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      body: Sequelize.DataTypes.TEXT,
      created_at: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('comments');
  }
};
