const express = require('express');
const router = express.Router();
const models = require('./../models');
const User = models.User;
const Calendar = models.Calendar;
const CalendarEvent = models.CalendarEvent;
const sequelize = models.sequelize;

router.get('/', (req, res) => {
	CalendarEvent.findAll({ include: { model: Calendar, include: User } })
		.then(calendarEvents => {
			res.render('events/index', {
				title: 'Events',
				events: calendarEvents.map(_convertDateTimes)
			});
		})
		.catch(e => res.status(500).send(e.stack));
});

router.post('/', (req, res) => {
	const body = req.body;

	const eventParams = {
		name: body.event.name,
		description: body.event.description,
		startDateTime: new Date(body.event.startDateTime).getTime() / 1000,
		endDateTime: new Date(body.event.endDateTime).getTime() / 1000,
		calendarId: body.event.calendarId
	};

	console.log(eventParams);

	CalendarEvent.create(eventParams)
		.then(event => {
			res.redirect(`/events/${event.id}`);
		})
		.catch(e => res.status(500).send(e.stack));
});

router.get('/new', (req, res) => {
	Calendar.findAll().then(calendars => {
		res.render('events/new', {
			title: 'New User',
			calendars: calendars
		});
	});
});

router.get('/:id', (req, res) => {
	CalendarEvent.findById(req.params.id, {
		include: { model: Calendar, include: User }
	})
		.then(_renderEvent)
		.catch(e => res.status(500).send(e.stack));

	function _renderEvent(event) {
		if (event) {
			event = _convertDateTimes(event);
			res.render('events/show', {
				title: `${event.name}`,
				event: event
			});
		} else {
			res.send(404);
		}
	}
});

router.delete('/:id', (req, res) => {
	CalendarEvent.destroy({ where: { id: req.params.id } })
		.then(res.doRedirect('/events'))
		.catch(e => res.status(500).send(e.stack));
});

router.put('/:id', (req, res) => {
	console.log('FOO');
	const eventParams = req.body.event;
	console.log(eventParams);
	CalendarEvent.update(
		{
			name: eventParams.name,
			description: eventParams.description,
			startDateTime: new Date(eventParams.startDateTime).getTime() / 1000,
			endDateTime: new Date(eventParams.endDateTime).getTime() / 1000
		},
		{
			where: { id: req.params.id },
			limit: 1
		}
	)
		.then(() => {
			req.method = 'GET';
			res.redirect(`/events/${req.params.id}`);
		})
		.catch(e => res.status(500).send(e.stack));
});

router.get('/:id/edit', (req, res) => {
	CalendarEvent.findById(req.params.id)
		.then(event => {
			if (event) {
				event.startDateTime = new Date(event.startDateTime * 1000)
					.toJSON()
					.slice(0, 16);
				event.endDateTime = new Date(event.endDateTime * 1000)
					.toJSON()
					.slice(0, 16);
				res.render('events/edit', {
					title: `Edit: ${event.name}`,
					event: event
				});
			} else {
				res.send(404);
			}
		})
		.catch(e => res.status(500).send(e.stack));
});

function _convertDateTimes(event) {
	let startDate = new Date(event.startDateTime * 1000);
	let endDate = new Date(event.startDateTime * 1000);

	event.startDateTime =
		startDate.toLocaleDateString() + ' ' + startDate.toLocaleTimeString();

	event.endDateTime =
		endDate.toLocaleDateString() + ' ' + endDate.toLocaleTimeString();

	return event;
}

module.exports = router;
