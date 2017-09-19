"use strict";

const models = require("../models");

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
    let users = [];
    for (let i = 0; i < 51; i++) {
      let user = {
        firstName: `foo${i}`,
        lastName: `foo${i}`,
        username: `foo_bar_${i}`,
        email: `foo_${i}@gmail.com`
      };
      users.push(user);
    }
    return queryInterface.bulkInsert("users", users);
  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete("users", null, {}, models.user);
  }
};
