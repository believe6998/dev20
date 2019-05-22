const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var recordSchema = new Schema({
    userId: {type: String},
    typeOfDisease: {type: String},
    drug: {type: String},
    createAt: {type: String},
    updateAt: {type: String},
    deleteAt: {type: String},
    status: {type:Number}

});

module.exports = mongoose.model("Record", recordSchema);
