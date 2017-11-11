'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
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

    for (var i = 1; i <= 5; i++) {
      events.push({
        name: `Event ${i}`,
        description: `Event description something${i}`,
        date: new Date(),
        startTime: "8:00:00",
        endTime: "12:00:00",
        calendarId: i
      });
    }

    return queryInterface.bulkInsert("Events", events);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete("Events", null, {}, models.Event);
  }
};
