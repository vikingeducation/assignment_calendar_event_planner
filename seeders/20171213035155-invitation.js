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
      data.push({
        eventId: i,
        userId: i
      });
    }

    return queryInterface.bulkInsert('Invitations', data);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Invitations', null, {}, models.Invitation);
  }
};
