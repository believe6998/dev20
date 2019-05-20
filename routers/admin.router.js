const express = require('express');
var controller = require('../controllers/admin.controller');

var router = express.Router();

router.get('/', function(req, res){
    res.render('admin/home');
})

module.exports = router;