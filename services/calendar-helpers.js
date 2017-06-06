const attachUserInfoToCalendars = (calendars, users) => {
  let results = calendars.map(calendar => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === calendar.userId) {
          calendar.fname = users[i].fname;
          calendar.lname = users[i].lname;
          calendar.username = users[i].username;
          calendar.email = users[i].email;
      }
    }
    return calendar;
  });

  return results;
};

module.exports = {
  attachUserInfoToCalendars
};