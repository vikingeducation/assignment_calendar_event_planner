const combineTables = (events, calendars, users) => {
  const newEvents = [];

  events.forEach(event => {
    let calendar;
    let user;
    let eventCalendarId = event.calendarId;

    let filteredCalendar = calendars.filter(cal => {
      return cal.id === eventCalendarId;
    });

    calendar = filteredCalendar[0];
    let calendarUserId = calendar.userId;

    let filteredUser = users.filter(user => {
      return user.id === calendarUserId;
    });

    user = filteredUser[0];

    newEvents.push({
      id: event.id,
      name: event.name,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      calendarName: calendar.name,
      calendarId: calendar.id,
      username: user.username,
      email: user.email,
      userId: user.id
    });
  });

  return newEvents;
};


module.exports = combineTables;
