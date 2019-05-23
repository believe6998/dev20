var Booking = require("../models/booking.model");
var Time = require("../models/time.model");
var DoctorTime = require("../models/doctorTime.model");
var mongoose = require('mongoose');
var myid = mongoose.Types.ObjectId;

exports.sendBooking = function (req, res) {
    var booking = new Booking({
        userId: req.user.id,
        doctorTimeId: req.body.id,
        doctorId: req.body.doctorId,
        timeId: req.body.timeId,
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updateAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        deleteAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    });
    DoctorTime.findByIdAndUpdate( req.body.id, {status: "1"}, {new: true}, function (err) {
        if (err) {
            res.send(err);
        } else {
            booking.save();
            res.send(req.body.time + "-" + req.body.doctorId + "-" + req.body.id + req.body.id);
        }
    });



};

exports.listBooking = function (req, res) {
    Booking.find({}, function (err, list) {
        res.render("admin/booking.ejs", {
            "listBooking": list
        });
    });

};

exports.deleteRegister = function (req, res) {
    Booking.findByIdAndRemove(myid(req.params.id), function (err) {
        if (err)
            res.send(err);
        else
            res.redirect(req.get('referer'));

    });

};

exports.updateRegister = function (req, res) {
    Booking.findByIdAndUpdate(req.params.id, req.body, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.redirect(req.get('referer'));
        }
    });
};


