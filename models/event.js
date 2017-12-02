'use strict';
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
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