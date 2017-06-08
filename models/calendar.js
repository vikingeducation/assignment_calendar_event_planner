'use strict';
module.exports = function(sequelize, DataTypes) {
  var calendar = sequelize.define('calendar', {
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return calendar;
};
