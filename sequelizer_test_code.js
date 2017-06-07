sequelize.query(
    "SELECT name, username, email FROM users JOIN calendars ON users.id = calendars.user_id;", {
      type: sequelize.QueryTypes.SELECT
    })
  .then((calendars) => {
    console.log(calendars);
  })
