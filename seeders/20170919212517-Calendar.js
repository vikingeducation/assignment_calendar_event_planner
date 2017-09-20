"use strict";
const models = require("../models");

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
    let calendars = [];
    for (var i = 0; i < 5; i++) {
      calendars.push({
        name: `calendar${i}`,
        userId: i + 1
      });
    }
    return queryInterface.bulkInsert("CalendarTables", calendars);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete(
      "CalendarTables",
      null,
      {},
      models.CalendarTables
    );
  }
};
