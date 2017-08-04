"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    let events = [];
    for (let i = 0; i < 9; i++) {
      events.push({
        name: `Event${i}`,
        description:
          "Labore mollit reprehenderit excepteur id et voluptate anim cupidatat labore magna. Deserunt pariatur Lorem ut reprehenderit eiusmod sit. Aliqua sit magna Lorem amet labore ipsum irure nisi excepteur aute qui.",
        startDateTime: Math.round(1470207902000 / 1000),
        endDateTime: Math.round(1470207902000 / 1000),
        calendarId: i + 1
      });
    }
    return queryInterface.bulkInsert("CalendarEvents", events);
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(
      "CalendarEvent",
      null,
      {},
      models.CalendarEvent
    );
  }
};
