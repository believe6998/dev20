const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bookingSchema = new Schema({
    // userId: {type: String},
    // specialistId: {type: String},
    doctorId: {type: String},
    time: {type: String},
    // createAt: {type: Date},
    // updateAt: {type: Date},
    // deleteAt: {type: Date},
    // status: {type:Number}

});

module.exports = mongoose.model("Booking", bookingSchema);
