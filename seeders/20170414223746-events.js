'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    var events = [];
    for (let i = 1; i < 10; i++) {
      events.push({
        name: `Foo${ i }`,
        description: `Description${ i }`,
        date: `2017-01-0${ i }`,
        startTime: `12:01:0${ i }`,
        endTime: `01:01:0${ i }`,
        calendarId: `${ i }`
      });
    }
    return queryInterface.bulkInsert('Events', events);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Events', null, {}, models.Event);
  }
};
