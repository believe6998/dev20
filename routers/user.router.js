const router = require('express').Router();


// '/user/login'
router.get('/login', function(req, res){ 
    res.render('client/login');
})

// router.post('/login', )

module.exports = router;