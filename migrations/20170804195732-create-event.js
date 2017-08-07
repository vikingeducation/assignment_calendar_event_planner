"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable("CalendarEvents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      startDateTime: {
        type: Sequelize.BIGINT
      },
      endDateTime: {
        type: Sequelize.BIGINT
      },
      calendarId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable("CalendarEvents");
  }
};
