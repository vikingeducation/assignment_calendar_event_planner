"use strict";
module.exports = function(sequelize, DataTypes) {
  var Invitation = sequelize.define("Invitation", {
    eventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  });
  Invitation.associate = function(models) {
    Invitation.belongsTo(models.User, { foreignKey: "userId" });
    Invitation.belongsTo(models.CalendarEvent, { foreignKey: "eventId" });
  };
  return Invitation;
};
