const models = require('./../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    var users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        fname: `Foo${ i }`,
        lname: `Bar${ i }`,
        username: `foobar${ i }`,
        email: `foobar${ i }@gmail.com`
      });
    }
    return queryInterface.bulkInsert('Users', users);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {}, models.User);
  }
};
