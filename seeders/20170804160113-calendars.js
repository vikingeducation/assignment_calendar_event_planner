"use strict";
const models = require("./../models");

module.exports = {
  up: function(queryInterface, Sequelize) {
    let calendars = [];
    for (let i = 0; i < 10; i++) {
      calendars.push({
        name: `Calendar${i}`,
        userId: i + 1
      });
    }
    return queryInterface.bulkInsert("Calendars", calendars);
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Calendars", null, {}, models.Calendar);
  }
};
