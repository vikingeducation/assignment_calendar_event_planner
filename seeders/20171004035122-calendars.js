'use strict';
var models = require('./../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    var calendars = [];
    for (let i = 1; i < 11; i++) {
      calendars.push({
        name: `Calendar${i}`,
        userId: i
      });
    }
    return queryInterface.bulkInsert('Calendars', calendars);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Calendars', null, {}, models.Calendar);
  }
};
