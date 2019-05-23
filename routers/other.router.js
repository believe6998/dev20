const router = require('express').Router();
var auth = require('../middleware/auth.middleware');

router.get('/', function (req, res) {
    res.render('client/home', { 'user': req.user });
})

router.get('/contact',function (req,res) {
    res.render('client/contact', { 'user': req.user })
})
router.get('/about',function (req,res) {
    res.render('client/about', { 'user': req.user })
})

module.exports = router; 