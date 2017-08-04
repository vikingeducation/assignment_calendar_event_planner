"use strict";
module.exports = function(sequelize, DataTypes) {
  var Calendar = sequelize.define("Calendar", {
    name: DataTypes.STRING
  });

  Calendar.associate = function(models) {
    Calendar.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Calendar;
};
