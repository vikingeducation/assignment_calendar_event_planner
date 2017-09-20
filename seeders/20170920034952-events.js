"use strict";

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
    let events = [];
    for (var i = 0; i < 5; i++) {
      events.push({
        name: `event${i}`,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae risus elit. Donec pretium augue quis ex faucibus auctor. Aliquam lacinia suscipit odio, nec tristique arcu tincidunt vel. Nulla facilisis laoreet turpis, a bibendum ligula sollicitudin eu. Fusce at tellus vulputate, egestas est vel, tempus enim. Mauris suscipit condimentum quam sit amet ornare.",
        date: "2016-08-09",
        startTime: "04:05:02",
        endTime: "06:05:02",
        calendarId: i + 1
      });
    }
    return queryInterface.bulkInsert("EventTables", events);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete(
      "EventTables",
      null,
      {},
      models.EventTables
    );
  }
};
