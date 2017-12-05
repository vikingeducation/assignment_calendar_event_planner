'use strict';
module.exports = (sequelize, DataTypes) => {
  var Calendar = sequelize.define('Calendar', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Calendar;
};