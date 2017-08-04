// const pass = require("./stupidworkaround").password;

module.exports = {
  development: {
    username: process.env.USERNAME,
    password: null,
    database: "assignment_calendar_event_planner_development",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: process.env.USERNAME,
    password: null,
    database: "assignment_calendar_event_planner_test",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: process.env.USERNAME,
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres"
  }
};
