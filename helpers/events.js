const amendEvents = (events, calendars, users) => {
  events.forEach(event => {
    let calendarFilter = calendars.filter(c => {
      return c.id === event.calendarId;
    });
    let calendar = calendarFilter[0];
    event.calendarName = calendar.name;

    let userFilter = users.filter(u => {
      return u.id === calendar.userId;
    });
    let user = userFilter[0];
    event.userId = user.id;
    event.username = user.username;
    event.email = user.email;
  });
  return events;
};

module.exports = { amendEvents };
