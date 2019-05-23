const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bookingSchema = new Schema({
    userId: {type: String},
    doctorTimeId: {type: String},
    doctorId: {type: String},
    timeId: {type: String},
    createAt: {type: String},
    updateAt: {type: String},
    deleteAt: {type: String},


});

module.exports = mongoose.model("Booking", bookingSchema);
