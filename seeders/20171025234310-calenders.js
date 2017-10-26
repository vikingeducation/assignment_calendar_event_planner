"use strict";
var models = require("./../models");

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

		for (let i = 1; i < 10; i++) {
			calendars.push({
				name: `calendar ${i}`,
				userId: i
			});
		}

		return queryInterface.bulkInsert("Calendars", calendars);
	},

	down: (queryInterface, Sequelize) => {
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
		return queryInterface.bulkDelete("Calendars", null, {}, models.Calendar);
	}
};
