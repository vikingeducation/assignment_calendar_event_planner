var CalendarsHelper = {};

CalendarsHelper.calendarsPath = () => '/calendars';
CalendarsHelper.calendarPath = (id) => `/calendars/${ id }`;
CalendarsHelper.newCalendarPath = () => '/calendars/new';
CalendarsHelper.editCalendarPath = (id) => `/calendars/${ id }/edit`;
CalendarsHelper.destroyCalendarPath = (id) => `/calendars/${ id }?_method=delete`;

CalendarsHelper.calendarFormAction = (calendar) => {
  if (calendar) {
    return `/calendars/${ calendar.id }`;
  } else {
    return '/calendars';
  }
};

module.exports = CalendarsHelper;
