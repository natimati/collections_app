'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addConstraint('collections', {
          fields: ['author_id'],
          type: 'FOREIGN KEY',
          name: 'FK_collection_user',
          references: { table: 'users', field: 'id' },
          onDelete: 'CASCADE'
        })
      ])
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeContraint('collections', 'FK_collection_user')
  }
};
