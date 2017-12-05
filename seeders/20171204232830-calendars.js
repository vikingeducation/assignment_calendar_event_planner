'use strict';

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
	  var calendars = [];
  for (let i = 0; i < 10; i++) {
    calendars.push({
      name: `Foo${ i }`,
      username: `foobar${ i }`,
      email: `foobar${ i }@gmail.com`
    });
  }
  return queryInterface.bulkInsert('Calendars', calendars);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
