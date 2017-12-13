'use strict';
const models = require('../models/index');

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
    const data = [];

    for (let i = 1; i <= 10; i++) {
      const eventName = `Event${i}`;

      data.push({
        name: eventName,
        description: 'Lorem ipsum',
        date: '2017-1-1',
        startTime: '3pm',
        endTime: '4pm',
        calendarId: i
      });
    }

    return queryInterface.bulkInsert('Events', data);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Events', null, {}, models.event);
  }
};
