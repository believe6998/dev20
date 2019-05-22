const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var timeSchema = new Schema({
    id: {type: Number},
    time: {type: String},
});

module.exports = mongoose.model("Time", timeSchema);
