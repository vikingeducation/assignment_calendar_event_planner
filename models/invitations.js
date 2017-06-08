'use strict';
module.exports = function(sequelize, DataTypes) {
  var invitations = sequelize.define('invitations', {
    event_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return invitations;
};