'use strict';
const models = require('../models');
const MIN_SEEDS = require('./seeding-config.json').minimum;

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
    for (var i = 0; i < MIN_SEEDS; i++) {
      calendars.push({
        name: `My Calendar ${ i }`,
        userId: Math.floor((Math.random() * MIN_SEEDS) + 1),
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
