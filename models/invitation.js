"use strict";
module.exports = (sequelize, DataTypes) => {
  var Invitation = sequelize.define("Invitation", {
    eventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  });
  Invitation.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.EventTables, { foreignKey: "eventId" });
    this.belongsTo(models.UserTables, { foreignKey: "userId" });
  };
  return Invitation;
};
