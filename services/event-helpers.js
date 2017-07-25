const attachDetailsToEvents = (events, calendars, users) => {
  let results = events.map(eachEvent => {
    
    // iterate through all the calendars to find calendar name and
    // associated user
    for (let i = 0; i < calendars.length; i++) {
      if (calendars[i].id === eachEvent.calendarId) {
          eachEvent.calendarName = calendars[i].name;
          eachEvent.userId = calendars[i].userId;
      }
    }

    // then iterate through all users to find username and email,
    // attaching them to each event object
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === eachEvent.userId) {
          eachEvent.username = users[i].username;
          eachEvent.email = users[i].email;
      }
    }

    // removes extra information from dates and times
    eachEvent.date = eachEvent.date.toString().slice(0, 15);
    eachEvent.start = eachEvent.start.toString().slice(0, 8);
    eachEvent.end = eachEvent.end.toString().slice(0, 8);

    return eachEvent;
  });

  return results;
};

module.exports = {
  attachDetailsToEvents
};