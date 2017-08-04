"use strict";
module.exports = function(sequelize, DataTypes) {
  var Invitation = sequelize.define("Invitation", {
    eventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  });
  return Invitation;
};
