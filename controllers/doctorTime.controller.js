var Booking = require("../models/booking.model");
var Time = require("../models/time.model");
var DoctorTime = require("../models/doctorTime.model");
var mongoose = require('mongoose');
var User = require("../models/user.model");
var myid = mongoose.Types.ObjectId;

exports.createDoctorTime = function (req, res) {
    var timeDoctor = new DoctorTime({
        doctorId: req.body.doctorId,
        timeId: req.body.timeId,
        status: '0',
    });
    timeDoctor.save();
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

exports.doctorTimeBook = function (req, res) {
    User.find({isDoctor: true}, function (err, docs1) {
            DoctorTime.find({doctorId: req.params.id}, function (err, list) {
                res.render("client/bookingDoctor.ejs", {
                    user: req.user,
                    "listDoctorTime": list,
                    "listDoctor": docs1,
                });
            });
        });
};

