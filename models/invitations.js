'use strict';
module.exports = (sequelize, DataTypes) => {
  var Invitations = sequelize.define('Invitations', {
    event_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Invitations;
};