const express = require('express');
var controller = require('../controllers/booking.controller');
var timeController = require('../controllers/time.controller');
var router = express.Router();



router.get("/booking", timeController.listTime);

router.post('/booking/send', controller.sendBooking);




module.exports = router;
