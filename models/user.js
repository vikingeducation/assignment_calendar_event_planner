"use strict";
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define(
    "User",
    {
      fname: DataTypes.STRING,
      lname: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function(models) {
          User.hasMany(models.Calendar, {
            foreignKey: "userId",
            foreignKeyConstraint: true,
            onDelete: "CASCADE"
          });
        }
      }
    }
  );
  return User;
};
