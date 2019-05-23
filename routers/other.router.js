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
router.get('/departments',function (req,res) {
    res.render('client/departments', { 'user': req.user })
})
router.get('/doctors',function (req,res) {
    res.render('client/doctors', { 'user': req.user })
})
router.get('/blog/1',function (req,res) {
    res.render('client/blog1', { 'user': req.user })
})

module.exports = router; 