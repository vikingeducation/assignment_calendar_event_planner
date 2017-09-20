"use strict";
module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define(
    "Event",
    {
      name: DataTypes.STRING,
      calendarId: DataTypes.INTEGER,
      description: DataTypes.STRING,
      date: DataTypes.DATEONLY,
      startTime: DataTypes.TIME,
      endTime: DataTypes.TIME
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  );
  return Event;
};
