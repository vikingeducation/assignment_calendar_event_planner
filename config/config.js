require('dotenv').config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: 'calendar_event_planner_development',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: 'calendar_event_planner_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: 'calendar_event_planner_production',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};
