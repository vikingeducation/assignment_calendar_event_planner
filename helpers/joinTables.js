const joinTables = (calendars, users) => {
  const combinedTable = [];

  calendars.forEach(calendar => {
    let calendarUserId = calendar.userId;
    let matchedUser;

    for (let i = 0; i <= users.length - 1; i++) {
      let user = users[i];

      if (calendarUserId === user.id) {
        matchedUser = user;
        break;
      }
    }

    combinedTable.push({
      name: calendar.name,
      username: matchedUser.username,
      email: matchedUser.email,
      userId: matchedUser.id,
      calendarId: calendar.id
    });
  });

  return combinedTable;
};



module.exports = joinTables;
