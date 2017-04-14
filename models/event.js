"use strict";
module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define(
    "Event",
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      date: DataTypes.DATE,
      startTime: DataTypes.TIME,
      endTime: DataTypes.TIME,
      calendarId: DataTypes.INTEGER
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
