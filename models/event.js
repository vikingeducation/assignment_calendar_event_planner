'use strict';
module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    date: DataTypes.DATEONLY,
    start: DataTypes.TIME,
    end: DataTypes.TIME,
    calendarId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Event;
};