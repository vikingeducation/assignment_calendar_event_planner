'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var invitations = [];
    for (let i = 1; i < 5; i++) {
      invitations.push({
        eventId: i,
        userId: i
      });
    }
    return queryInterface.bulkInsert('Invitations', invitations);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'Invitations',
      null,
      {},
      models.Invitation
    );
  }
};
