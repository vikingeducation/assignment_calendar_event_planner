'use strict';
module.exports = function(sequelize, DataTypes) {
  var Invitation = sequelize.define('Invitation', {
    eventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Invitation;
};