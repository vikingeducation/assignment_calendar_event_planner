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
    var events = [];
    for (let calendarId = 1; calendarId <= 10; calendarId++) {
      for (let i = 1; i <= 5; i++) {
        events.push({
          name: `Event ${calendarId} ${i}`,
          calendarId: calendarId,
          description: "Amazing event",
          // Need to figure out exactly what format Date and Time have to instantiate them
          date: `2017-04-0${i}`,
          startTime: `0${i}:00:00`,
          endTime: `0${i + 1}:00:00`
        });
      }
    }
    return queryInterface.bulkInsert("Events", events);
  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete("Events", null, {}, models.Event);
  }
};
