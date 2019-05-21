const router = require('express').Router();

router.get('/', function (req, res) {
    res.render('client/home');
})

module.exports = router; 