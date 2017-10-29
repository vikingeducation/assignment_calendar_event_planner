const db = require('./../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    var events = [];

    return db.calendars.findAll()
      .then(calendars => {
        for (let calendar of calendars) {
          for (let i = 0; i < 3; i++) {
            events.push({
              name: `My Event ${ i }`,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
              date: new Date(2018, 0, 1),
              start: new Date(2018, 0, 1, 5),
              end: new Date(2018, 0, 1, 7),
              calendarId: calendar.id
            });
          }
        }
        return queryInterface.bulkInsert('Events', events);
      })
      .catch(e => { throw e; });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {}, db.Event);
  }
};
