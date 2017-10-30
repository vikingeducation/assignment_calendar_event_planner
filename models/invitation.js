module.exports = (sequelize, DataTypes) => {
  var Invitation = sequelize.define('Invitation', {
    eventId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Invitation;
};
