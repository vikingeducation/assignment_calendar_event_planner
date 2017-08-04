"use strict";
module.exports = function(sequelize, DataTypes) {
  var calEvent = sequelize.define(
    "Event",
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      date: DataTypes.STRING,
      start: DataTypes.STRING,
      end: DataTypes.STRING,
      calendarId: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  );
  return calEvent;
};
