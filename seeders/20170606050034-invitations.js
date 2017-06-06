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
    let invitations = [];
    for (let i = 0; i < 10; i++) {
      invitations.push({
        eventId: i + 1,
        userId: i + 1
      });
    }
    return queryInterface.bulkInsert('Invitations', invitations);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Invitations', null, {}, models.Invitation);
  }
};
