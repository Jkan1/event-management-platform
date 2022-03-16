const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller');
const validator = require('../validators/validator');

router.post('/create-event', validator.createEvent, controller.createEvent);

router.get('/get-events', validator.getEvents, controller.getEvents);

module.exports = router;