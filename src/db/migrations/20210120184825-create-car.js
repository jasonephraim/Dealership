"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Cars", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING,
      },
      doors: {
        type: Sequelize.INTEGER,
      },
      automatic: {
        type: Sequelize.BOOLEAN,
      },
      isNew: {
        type: Sequelize.BOOLEAN,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      miles: {
        type: Sequelize.INTEGER,
      },
      dealershipID: {
        type: Sequelize.STRING,
      },
      clientID: {
        type: Sequelize.STRING,
      },
      employeeID: {
        type: Sequelize.STRING,
      },
      sold: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Cars");
  },
};
