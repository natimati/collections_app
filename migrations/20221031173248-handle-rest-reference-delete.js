'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addConstraint('items', {
          fields: ['author_id'],
          type: 'FOREIGN KEY',
          name: 'FK_item_user',
          references: { table: 'users', field: 'id' },
          onDelete: 'CASCADE'
        }, { transaction: t }),
        queryInterface.addConstraint('items', {
          fields: ['collection_id'],
          type: 'FOREIGN KEY',
          name: 'FK_item_collection',
          references: { table: 'collections', field: 'id' },
          onDelete: 'CASCADE'
        }, { transaction: t }),
        queryInterface.addConstraint('item_properties', {
          fields: ['item_id'],
          type: 'FOREIGN KEY',
          name: 'FK_item_property_item',
          references: { table: 'items', field: 'id' },
          onDelete: 'CASCADE'
        }, { transaction: t }),
        queryInterface.addConstraint('item_properties', {
          fields: ['additional_field_id'],
          type: 'FOREIGN KEY',
          name: 'FK_item_property_additional_field',
          references: { table: 'additional_fields', field: 'id' },
          onDelete: 'CASCADE'
        }, { transaction: t }),
        queryInterface.addConstraint('comments', {
          fields: ['item_id'],
          type: 'FOREIGN KEY',
          name: 'FK_comment_item',
          references: { table: 'items', field: 'id' },
          onDelete: 'CASCADE'
        }, { transaction: t }),
      ])
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeContraint('items', 'FK_item_user', { transaction: t }),
        queryInterface.removeContraint('items', 'FK_item_collection', { transaction: t }),
        queryInterface.removeContraint('item_properties', 'FK_item_property_item', { transaction: t }),
        queryInterface.removeContraint('item_properties', 'FK_item_property_additional_field', { transaction: t }),
        queryInterface.removeContraint('comments', 'FK_comment_item', { transaction: t }),
      ])
    })
  }
}
