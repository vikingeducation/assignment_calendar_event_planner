'use strict';
var models = require('./../models');

module.exports = {
  up: function(queryInterface, Sequelize) {
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
    for (let i = 1; i <= 30; i++) {
      invitations.push({
        event_id: Math.floor(Math.random() * 10) + 1,
        user_id: Math.floor(Math.random() * 10) + 1
      });
    }
    return queryInterface.bulkInsert('invitations', invitations);
  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('calendars', null, {}, models.invitations);
  }
};
