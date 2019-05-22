const router = require('express').Router();
var auth = require('../middleware/auth.middleware');

router.get('/', function (req, res) {
    res.render('client/home', { 'user': req.user });
})

module.exports = router; 