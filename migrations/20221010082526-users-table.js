'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('user', {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4
      },
      username: Sequelize.DataTypes.STRING,
      email: Sequelize.DataTypes.STRING,
      password: Sequelize.DataTypes.STRING,
      salt: Sequelize.DataTypes.STRING,
      is_admin: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      },
      registration_time: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW
      },
      last_login_time: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('user');
  }
};
