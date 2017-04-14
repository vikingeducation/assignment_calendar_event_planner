'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
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
          description: "Amazing event",
          // Need to figure out exactly what format Date and Time have to instantiate them
          date: DataTypes.DATE,
          startTime: DataTypes.TIME,
          endTime: DataTypes.TIME
        });
      }
    }
    return queryInterface.bulkInsert('Calendars', calendars);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
