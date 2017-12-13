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

    const users = [];

    for (let i = 1; i <= 10; i++) {
      let user = {};

      user.firstName = `Foo${i}`;
      user.lastName = `Bar${i}`;
      user.username = `FooBar${i}`;
      user.email = `FooBar${i}@email.com`;

      users.push(user);
    }

    return queryInterface.bulkInsert('Users', users);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {}, models.User);
  }
};
