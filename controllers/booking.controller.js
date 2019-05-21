var Booking = require("../models/booking.model");

exports.sendBooking = function (req, res) {
    var booking = new Booking({
        doctorId: req.body.doctorId,
        time: req.body.time

    });
    booking.save();
    // res.redirect(req.get('referer'));
    res.send(req.body.time + "-" + req.body.doctorId);
};

