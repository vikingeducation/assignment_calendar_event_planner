'use strict';
const models = require('../models');

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
    let events = [];
    for (let i = 0; i < 10; i++) {
      events.push({
        name: `The Bazziest Foo${ i } Bar`,
        description: `This event is about stuff`,
        date: `01/1${ i }/16`,
        start: `0${ i }:0${ i } PM`,
        end: `0${ i }:0${ i } AM`,
        calendarId: i + 1
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
