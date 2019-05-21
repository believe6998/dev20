const router = require('express').Router();
var controller = require('../controllers/admin.controller');


router.get('/', function(req, res){
    res.render('admin/home');
})

module.exports = router;