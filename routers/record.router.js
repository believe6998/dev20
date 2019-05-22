const express = require('express');
var recordController = require('../controllers/record.controller');
var router = express.Router();





router.get("/record", recordController.listRecord);


module.exports = router;
