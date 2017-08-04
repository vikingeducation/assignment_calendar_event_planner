const express = require('express');
const router = express.Router();
const models = require('./../models');
const User = models.User;
const Calendar = models.Calendar;
const sequelize = models.sequelize;

router.get('/', (req, res) => {
	let CalendarsPromise = Calendar.findAll()
		.then(results => {
			res.render('calendars/index', {
				title: 'Calendars',
				calendars: results.calendars,
				user: results.user
			});
		})
		.catch(e => res.status(500).send(e.stack));
});

router.post('/', (req, res) => {
	const body = req.body;

	const userParams = {
		fname: body.calendar.fname,
		lname: body.calendar.lname,
		username: body.calendar.username,
		email: body.calendar.email
	};

	Calendar.create(userParams)
		.then(calendar => {
			res.redirect(`/${calendar.id}`);
		})
		.catch(e => res.status(500).send(e.stack));
});

router.get('/new', (req, res) => {
	res.render('calendars/new', { title: 'New Calendar' });
});

router.get('/:id', (req, res) => {
	Calendar.findById(req.params.id)
		.then(calendar => {
			if (calendar) {
				res.render('calendars/show', {
					title: `${calendar.fname} ${calendar.lname}`
				});
			} else {
				res.send(404);
			}
		})
		.catch(e => res.status(500).send(e.stack));
});

router.delete('/:id', (req, res) => {
	Calendar.destroy({
		where: { id: req.params.id },
		limit: 1
	})
		.then(() => {
			res.redirect('');
		})
		.catch(e => res.status(500).send(e.stack));
});

router.put('/:id', (req, res) => {
	const userParams = req.body.calendar;

	Calendar.update(
		{
			fname: userParams.fname,
			lname: userParams.lname,
			username: userParams.username,
			email: userParams.email
		},
		{
			where: { id: req.params.id },
			limit: 1
		}
	)
		.then(() => {
			req.method = 'GET';
			res.redirect(`/${req.params.id}`);
		})
		.catch(e => res.status(500).send(e.stack));
});

router.get('/:id/edit', (req, res) => {
	Calendar.findById(req.params.id)
		.then(calendar => {
			if (calendar) {
				res.render('calendars/edit', {
					title: `Edit: ${calendar.fname} ${calendar.lname}`,
					calendar: calendar
				});
			} else {
				res.send(404);
			}
		})
		.catch(e => res.status(500).send(e.stack));
});

module.exports = router;
