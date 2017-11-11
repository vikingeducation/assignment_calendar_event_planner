'use strict';

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
    var invitations = [];

    for (let i = 1; i <= 5; i++) {
      invitations.push({
        eventId: i,
        userId: i
      });
    }

    return queryInterface.bulkInsert("Invitations", invitations);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete("Invitations", null, {}, models.Invitation);
  }
};
