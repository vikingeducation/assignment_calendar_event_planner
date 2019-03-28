'use strict';
var models = require('./../models')
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    var users = [];

    for(var i = 0; i <= 20; i++){
      users.push({
        fname: `Jimmy${i}`,
        lname: `Smith${i}`,
        username: `jsmith${i}`,
        email: `jsmith${i}@gmail.com`
      });
    };

    return queryInterface.bulkInsert('Users', users)
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */
    return queryInterface.bulkDelete('Users', null, {}, models.User);
  }
};
