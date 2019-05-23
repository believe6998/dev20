const express = require('express');
var controller = require('../controllers/booking.controller');
var timeController = require('../controllers/time.controller');
var doctortimeController = require("../controllers/doctorTime.controller");
var router = express.Router();



router.get("/booking", timeController.listBook);
router.get("/booking/:id", doctortimeController.doctorTimeBook);

router.post("/booking/send", controller.sendBooking);


module.exports = router;
