"use strict";
let models = require("../models");
module.exports = {
  up: function(queryInterface, Sequelize) {
    let invitations = [];
    for (let i = 0; i < 9; i++) {
      invitations.push({
        userId: i + 1,
        eventId: i + 1
      });
    }
    return queryInterface.bulkInsert("Invitations", invitations);
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(
      "Invitations",
      null,
      {},
      models.Invitation
    );
  }
};
