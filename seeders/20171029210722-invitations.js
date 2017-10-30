const db = require('./../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    var invitations = [];

    return db.events.findAll()
      .then(events => {
        for (let event of events) {
          for (let i = 0; i < 2; i++) {
            invitations.push({
              userId: Math.floor(Math.random() * 10),
              eventId: event.id
            });
          }
        }
        return queryInterface.bulkInsert('Invitations', invitations);
      })
      .catch(e => { throw e; });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Invitations', null, {}, db.Invitation);
  }
};
