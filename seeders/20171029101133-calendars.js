const models = require('./../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    var calendars = [];
    for (let i = 0; i < 10; i++) {
      calendars.push({
        name: `My Calendar ${ i }`,
        userId: i + 1
      });
    }
    return queryInterface.bulkInsert('Calendars', calendars);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Calendars', null, {}, models.Calendar);
  }
};
