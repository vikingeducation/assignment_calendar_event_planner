'use strict';

var models = require('./../models');

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
    var calendars = [];
    for (let userId = 1; userId <= 10; userId++) {
      calendars.push({
        name: `Calendar ${ userId }`,
        userId: userId
      });
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
    return queryInterface.bulkDelete('Calendars', null, {}, models.Calendar);
  }
};
