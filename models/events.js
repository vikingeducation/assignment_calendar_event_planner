"use strict";
module.exports = (sequelize, DataTypes) => {
	var Events = sequelize.define(
		"Events",
		{
			name: DataTypes.STRING,
			description: DataTypes.STRING,
			date: DataTypes.DATE,
			start_time: DataTypes.DATE,
			end_time: DataTypes.DATE,
			calender_id: DataTypes.INTEGER
		},
		{
			classMethods: {
				associate: function(models) {
					// associations can be defined here
				}
			}
		}
	);
	return Events;
};
