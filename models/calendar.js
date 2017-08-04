'use strict';
module.exports = function(sequelize, DataTypes) {
	var Calendar = sequelize.define('Calendar', {
		name: DataTypes.STRING,
		userId: DataTypes.INTEGER
	});

	Calendar.associate = function(models) {
		Calendar.belongsTo(models.User, {
			foreignKey: 'userId'
		});
	};

	return Calendar;
};
