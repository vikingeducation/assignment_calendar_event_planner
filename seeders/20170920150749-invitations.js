"use strict";

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
    let invits = [];
    for (var i = 1; i < 5; i++) {
      invits.push({
        eventId: i,
        userId: i
      });
      invits.push({
        eventId: i,
        userId: i + 1
      });
    }
    return queryInterface.bulkInsert("Invitations", invits);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete(
      "Invitations",
      null,
      {},
      models.Invitations
    );
  }
};
