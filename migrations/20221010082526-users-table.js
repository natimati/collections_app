'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.DataTypes.UUID,
        autoIncrement: false,
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
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      last_login_time: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW
      },
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
