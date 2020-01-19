'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
          notNull: true,
        }
      },
      nickname: {
        type: Sequelize.STRING,
        validate: {
          notNull: true,
        }
      },
      password: {
        type: Sequelize.STRING,
        validate: {
          notNull: true,
          len: [6,20]
        }
      },
      gender: {
        type: Sequelize.STRING,
        validate: {
          notNull: true,
        }
      },
      salt: {
        type: Sequelize.STRING,
        validate: {
          notNull: true,
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};