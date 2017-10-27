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

		var events = [];

		for (let i = 1; i < 5; i++) {
			events.push({
				name: `event ${i}`,
				description: `lorem ipsum blah blah ${i}`,
				date: `2017-10-26`,
				start_time: "10:00:00",
				end_time: "12:00:00",
				calendar_id: i
			});
		}

		return queryInterface.bulkInsert("Events", events);
	},

	down: (queryInterface, Sequelize) => {
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */

		return queryInterface.bulkDelete("Events", null, {}, models.Events);
	}
};
