"use strict";
const models = require("../models");

module.exports = {
  up: function(queryInterface, Sequelize) {
    let users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        fname: `Foo${i}`,
        lname: `Bar${i}`,
        username: `foobar${i}`,
        email: `foobar${i}@gmail.com`
      });
    }
    return queryInterface.bulkInsert("Users", users);
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {}, models.User);
  }
};
