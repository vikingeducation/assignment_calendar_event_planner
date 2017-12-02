const amendCalendars = (calendars, users) => {
  calendars.forEach(calendar => {
    let result = users.filter(u => {
      return u.id === calendar.userId;
    });
    let user = result[0];
    calendar.userId = user.id;
    calendar.username = user.username;
    calendar.email = user.email;
  });
  return calendars;
};

module.exports = { amendCalendars };
