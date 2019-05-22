var Booking = require("../models/booking.model");
var Time = require("../models/time.model");
var DoctorTime = require("../models/doctorTime.model");
var mongoose = require('mongoose');
var myid = mongoose.Types.ObjectId;

exports.createDoctorTime = function (req, res) {
    var doctorTime = new DoctorTime({
        doctorId: req.body.doctorId,
        timeId: req.body.timeId,
        status: '0',
    });
    doctorTime.save();
    // res.redirect(req.get('referer'));
    res.send(req.body.time + "-" + req.body.doctorId);
};

exports.listDoctorTime = function (req, res) {
    DoctorTime.find({}, function (err, list) {
        res.render("admin/doctorTime.ejs", {
            "listDoctorTime": list
        });
    });

};
