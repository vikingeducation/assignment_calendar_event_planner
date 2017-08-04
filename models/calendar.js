"use strict";
module.exports = function(sequelize, DataTypes) {
  var calendars = sequelize.define(
    "calendars",
    {
      name: DataTypes.STRING,
      userid: DataTypes.INTEGER
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  );
  return calendars;
};
