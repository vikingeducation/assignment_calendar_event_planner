'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Refer: https://lorenstewart.me/2016/09/12/sequelize-table-associations-joins/
//Models/tables
db.users = require('../models/user.js')(sequelize, Sequelize);  
db.calendars = require('../models/calendar.js')(sequelize, Sequelize);  
db.events = require('../models/event.js')(sequelize, Sequelize);

//Relations
db.calendars.hasMany(db.events, { foreignKey: "calendarId" });
db.events.belongsTo(db.calendars, { foreignKey: "calendarId" });
db.users.hasMany(db.calendars, { foreignKey: "userId" });
db.calendars.belongsTo(db.users, { foreignKey: "userId" });

module.exports = db;
