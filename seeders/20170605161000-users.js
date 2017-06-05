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
    let users = [];
    for (var i = 0; i < 10; i++) {
      users.push({
        fname: `Foo${ i }`,
        lname: `Bar${ i }`,
        username: `foobar${ i }`,
        email: `foobar${ i }@baz.org`,
      });
    }
    return queryInterface.bulkInsert('Users', users);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {}, models.User);
  }
};
