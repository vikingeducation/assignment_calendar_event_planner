"use strict";
var models = require("./../models");

module.exports = {
  up: function(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    let calendars = [];
    for (let calendarId = 0; calendarId < 4; calendarId++) {
      calendars.push({
        name: `MyCalendar{i}`
      });
    }

    return queryInterface.bulkInsert("Calendars", calendars);
  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete("Calendars", null, {}, models.Calendar);
  }
};
