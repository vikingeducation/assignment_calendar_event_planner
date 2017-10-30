var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = require('./user')(sequelize, Sequelize);
db.calendars = require('./calendar.js')(sequelize, Sequelize);
db.events = require('./event.js')(sequelize, Sequelize);
db.invitations = require('./invitation.js')(sequelize, Sequelize);

//Relations
db.calendars.belongsTo(db.users, { foreignKey: 'userId', as: 'user'});
db.users.hasMany(db.calendars, { foreignKey: 'userId', as: 'calendars' });

db.events.belongsTo(db.calendars, { foreignKey: 'calendarId', as: 'calendar'});
db.calendars.hasMany(db.events, { foreignKey: 'calendarId', as: 'events' });

db.invitations.belongsTo(db.events, { foreignKey: 'eventId', as: 'event'});
db.invitations.belongsTo(db.users, { foreignKey: 'userId', as: 'user'});
db.events.hasMany(db.invitations, {foreignKey: 'eventId', as: 'invitations'});



module.exports = db;
