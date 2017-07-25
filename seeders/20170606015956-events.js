'use strict';
const models = require('../models');
const MIN_SEEDS = require('./seeding-config.json').minimum;

const randomDate = () => {
   let startDate = new Date(2012,0,1).getTime();
   let endDate =  new Date(2015,0,1).getTime();
   let spaces = (endDate - startDate);
   let timestamp = Math.round(Math.random() * spaces);
   timestamp += startDate;
   return new Date(timestamp);
};

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
    for (let i = 0; i < MIN_SEEDS; i++) {
      events.push({
        name: `The Bazziest Foo${ i } Bar`,
        description: `This event is about stuff`,
        date: randomDate(),
        start: randomDate(),
        end: randomDate(),
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
