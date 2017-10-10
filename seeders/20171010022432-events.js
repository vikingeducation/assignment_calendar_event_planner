'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var events = [];
    for (let i = 1; i < 11; i++) {
      events.push({
        name: `Event${i}`,
        date: '2017-10-31',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        start_time: '10:00:00',
        end_time: '12:00:00',
        calendarId: i
      });
    }
    return queryInterface.bulkInsert('Events', events);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {}, models.Event);
  }
};
