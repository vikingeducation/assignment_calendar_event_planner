'use strict';
module.exports = (sequelize, DataTypes) => {
  var Calendar = sequelize.define('Calendar', {
    calendarName: DataTypes.STRING,
    userId: DataTypes.INTEGER
  });
  return Calendar;
};
