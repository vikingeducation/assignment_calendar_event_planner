"use strict";
module.exports = (sequelize, DataTypes) => {
	var Calendars = sequelize.define(
		"Calendars",
		{
			name: DataTypes.STRING,
			userId: DataTypes.INTEGER
		},
		{
			classMethods: {
				associate: function(models) {
					// associations can be defined here
				}
			}
		}
	);
	return Calendars;
};
