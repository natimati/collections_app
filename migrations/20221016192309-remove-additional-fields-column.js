'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('collections', 'additional_fields', { transaction: t }),
        queryInterface.createTable('additional_fields', {
          id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4
          },
          name: Sequelize.DataTypes.STRING,
          type: Sequelize.DataTypes.STRING,
          collection_id: {
            type: Sequelize.DataTypes.UUID,
            references: {
              model: {
                tableName: 'collections'
              },
              key: 'id'
            },
            allowNull: false
          },
          created_at: {
            type: Sequelize.DataTypes.DATE,
            defaultValue: Sequelize.DataTypes.NOW
          },
          updated_at: {
            type: Sequelize.DataTypes.DATE,
            defaultValue: Sequelize.DataTypes.NOW
          }
        }, { transaction: t })
      ])
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('collections', 'additional_fields', { type: Sequelize.DataTypes.JSON }, { transaction: t }),
        queryInterface.dropTable('additional_fields', { transaction: t })
      ])
    })
  },
};
