'use strict';

const models = require("../models");

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
    let calendars = [];
    for (let i = 0; i < 15; i++) {
      let calendar = {
        name: `fooCalendar${i}`
      };
      calendars.push(calendar);
    }
    return queryInterface.bulkInsert("Calendar", calendars);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete("users", null, {}, models.calendar);
  }
};
