"use strict";
const models = require("../models");

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
    let users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        fname: `Foo${i}`,
        lname: `Bar${i}`,
        username: `foobar${i}`,
        email: `foo@bar${i}`
      });
    }
    return queryInterface.bulkInsert("Users", users);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete("Users", null, {}, models.user);
  }
};
