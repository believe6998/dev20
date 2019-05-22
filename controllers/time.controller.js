var Booking = require("../models/booking.model");
var Time = require("../models/time.model");
var User = require("../models/user.model");
var DoctorTime = require("../models/doctorTime.model");
var mongoose = require('mongoose');
var myid = mongoose.Types.ObjectId;


exports.listTimeAdmin = function (req, res) {
    Time.find({}, function (err, list) {
        res.render("admin/time.ejs", {
            "listTime": list
        });
    });

};

exports.listBook = function (req, res) {
    User.find({isDoctor: true},function (err, docs1) {
        Time.find({},function (err, docs2) {
            res.render('client/booking.ejs', {
                user: req.user,
                "listDoctor": docs1,
                "listTime": docs2,
            });
        });
    });
};



exports.createTime = function (req, res) {
    var time = new Time({
        id: req.body.id,
        time: req.body.time,
    });
    time.save();
    res.redirect(req.get('referer'));
};

