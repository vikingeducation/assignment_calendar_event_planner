"use strict";

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
    for (let i = 1; i < 11; i++) {
      events.push({
        name: `Event Number ${i}`,
        description: `Event Description ${i}`,
        date: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        calendarId: i
      });
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
