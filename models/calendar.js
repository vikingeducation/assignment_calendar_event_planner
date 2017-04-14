'use strict';
module.exports = function(sequelize, DataTypes) {
  var Calendar = sequelize.define('Calendar', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Calendar;
};