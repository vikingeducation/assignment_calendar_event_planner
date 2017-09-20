"use strict";
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define("EventTables", {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    date: DataTypes.STRING,
    startTime: DataTypes.STRING,
    endTime: DataTypes.STRING,
    calendarId: DataTypes.INTEGER
  });
  Event.associate = function(models) {
    this.belongsTo(models.CalendarTables, { foreignKey: "calendarId" });
  };
  return Event;
};
