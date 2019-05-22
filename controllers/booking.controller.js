var Booking = require("../models/booking.model");
var Time = require("../models/time.model");
var mongoose = require('mongoose');
var myid = mongoose.Types.ObjectId;

exports.sendBooking = function (req, res) {
    var booking = new Booking({
        doctorId: req.body.doctorId,
        time: req.body.time,
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') ,
        updateAt:  new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        deleteAt:  new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        status: '1',
    });
    booking.save();
    // res.redirect(req.get('referer'));
    res.send(req.body.time + "-" + req.body.doctorId);
};

exports.listBooking = function (req, res) {
    Booking.find({}, function (err, list) {
        res.render("admin/booking.ejs", {
            "listBooking": list
        });
    });

};

exports.deleteRegister = function (req, res) {
    Booking.findByIdAndRemove(  myid(req.params.id), function(err) {
        if (err)
            res.send(err);
        else
            res.redirect(req.get('referer'));

    });

};

exports.updateRegister = function (req, res) {
    Booking.findByIdAndUpdate(req.params.id,req.body, function(err){
        if(err){
            res.send(err);
        }
        else {
            res.redirect(req.get('referer'));
        }
    });
};


