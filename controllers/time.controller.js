var Booking = require("../models/booking.model");
var Time = require("../models/time.model");
var mongoose = require('mongoose');
var myid = mongoose.Types.ObjectId;




exports.listTimeAdmin = function (req, res) {
    Time.find({}, function (err, list) {
        res.render("admin/time.ejs", {
            "listTime": list
        });
    });

};

exports.listTime = function (req, res) {
    Time.find({}, function (err, list) {
        res.render("client/booking.ejs", {
            user: req.user,
            "listTime": list
        });
    });

}

exports.createTime = function (req, res) {
    var time = new Time({
        time: req.body.time,
    });
    time.save();
    res.redirect(req.get('referer'));
};

