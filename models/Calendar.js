"use strict";
module.exports = function(sequelize, DataTypes) {
  var Calendar = sequelize.define(
    "Calendar",
    {
      name: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        references: "users",
        referencesKey: "id"
      }
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  );
  return Calendar;
};
