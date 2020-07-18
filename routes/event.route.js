const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const eventController = require('../controllers/events.controller');

router.post('/create', auth, eventController.create);
router.get('/all', auth, eventController.listEvents);
router.get('/:eventId', eventController.findEventById);
router.post('/:eventId/register', auth, eventController.register);
router.post('/:eventId/unregister', auth, eventController.unregister);
router.post('/:eventId/confirm/:recipientId', auth, eventController.confirmPoints); // Make sure that req.userData.accountId == event.owner
// body: 
// "volunteer": userId of person
// then, add event.reward to user.currency

module.exports = router;