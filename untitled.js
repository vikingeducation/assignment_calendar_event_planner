("use strict");
module.exports = function(sequelize, DataTypes) {
	var Calendar = sequelize.define("Calendar", {
		name: DataTypes.STRING
	});

	Calendar.associate = function(models) {
		Calendar.belongsTo(models.User, { foreignKey: "userId" });
	};
	return Calendar;
};

("use strict");
module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define("User", {
		fname: DataTypes.STRING,
		lname: DataTypes.STRING,
		username: DataTypes.STRING,
		email: DataTypes.STRING
	});

	User.associate = function(models) {
		User.hasMany(models.Calendar, { foreignKey: "userId" });
	};
	return User;
};
