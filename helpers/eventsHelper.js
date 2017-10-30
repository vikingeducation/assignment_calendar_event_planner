var EventsHelper = {};

EventsHelper.eventsPath = () => '/events';
EventsHelper.eventPath = (id) => `/events/${ id }`;
EventsHelper.newEventPath = () => '/events/new';
EventsHelper.editEventPath = (id) => `/events/${ id }/edit`;
EventsHelper.destroyEventPath = (id) => `/events/${ id }?_method=delete`;

EventsHelper.eventFormAction = (event) => {
  if (event) {
    return `/events/${ event.id }`;
  } else {
    return '/events';
  }
};

module.exports = EventsHelper;
