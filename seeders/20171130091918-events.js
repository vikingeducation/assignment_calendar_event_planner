'use strict';
const models = require('./../models');

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
    const events = [];
    for (let i = 1; i <= 10; i++) {
      events.push({
        name: `Event ${i}`,
        description: 'Lorem ipsum dolor sit amet',
        date: new Date(),
        start: '15:00:00',
        end: '16:00:00',
        calendarId: i
      });
    }
    return queryInterface.bulkInsert('Events', events);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Events', null, {}, models.Event);
  }
};
