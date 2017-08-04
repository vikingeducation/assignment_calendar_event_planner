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

    var calendars = [];
    for (let i = 1; i < 5; i++) {
      calendars.push({
        name: `Calendar${i}`,
        userid: `${i}`
      });
    }
    return queryInterface.bulkInsert("Calendar", Calendar);
  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
