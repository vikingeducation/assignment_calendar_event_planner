'use strict';

var models = require('../models');

module.exports = {
  up: function (queryInterface, Sequelize) {
    var calendars = [];
    for (let i = 1; i <= 10; i++) {
      calendars.push({
        userId: i,
        name: `My Calendar ${ i }`
      });
    }
    return queryInterface.bulkInsert('Calendars', calendars);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Calendars', null, {}, models.Calendar);
  }
};
