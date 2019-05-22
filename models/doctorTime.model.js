const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var timeDoctorSchema = new Schema({
    timeId: {type: String},
    doctorId: {type: String},
    status: {type: String},
});

module.exports = mongoose.model("TimeDoctor", timeDoctorSchema);
