"use strict";
module.exports = function(sequelize, DataTypes) {
  var Calendar = sequelize.define(
    "Calendar",
    {
      name: DataTypes.STRING,
      userId: DataTypes.INTEGER
    },
    {
      classMethods: {
        associate: function(models) {
          Calendar.belongsTo(models.User, {
            foreignKey: "userId",
            foreignKeyConstraint: true
          });
        }
      }
    }
  );
  return Calendar;
};
