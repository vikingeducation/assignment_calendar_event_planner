"use strict";
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING
  });

  User.associate = function(models) {
    User.hasMany(models.Calendar, {
      foreignKey: "userId"
    });
    User.belongsToMany(models.CalendarEvent, {
      through: "Invitation",
      foreignKey: "userId"
    });
  };

  return User;
};
