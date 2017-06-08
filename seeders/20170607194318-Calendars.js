'use strict';
var models = require('./../models');

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
    var calendar = [];
    for (let i = 1; i <= 10; i++) {
      calendar.push({
        name: `My Calendar${ i }`,
        user_id: i,
      });
      calendar.push({
        name: `My Other Calendar${ i }`,
        user_id: i,
      });
    }
    return queryInterface.bulkInsert('calendars', calendar);
  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('calendars', null, {}, models.Calendar);
  }
};
