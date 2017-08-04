"use strict";

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
    var users = [];
    for (let i = 0; i < 30; i++) {
      users.push({
        fname: `Foo${i}`,
        lname: `Bar${i}`,
        username: `foobar${i}`,
        email: `foobar${i}@gmail.com`
      });
    }
    users.push({
      fname: `Bob`,
      lname: `Segar`,
      username: `NyghtMoves`,
      email: `WaitingOnTheThunder@aol.com`
    });
    return queryInterface.bulkInsert("users", users);
  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
