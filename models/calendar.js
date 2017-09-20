"use strict";
module.exports = (sequelize, DataTypes) => {
  var Calendar = sequelize.define("CalendarTables", {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  });
  Calendar.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.UserTables, { foreignKey: "userId" });
  };
  return Calendar;
};
