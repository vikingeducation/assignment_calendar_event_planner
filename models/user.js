"use strict";
module.exports = (sequelize, DataTypes) => {
  var UserTable = sequelize.define(
    "UserTables",
    {
      fname: DataTypes.STRING,
      lname: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  );
  return UserTable;
};
