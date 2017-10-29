module.exports = (sequelize, DataTypes) => {
  var Calendar = sequelize.define('Calendar', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Calendar;
};
