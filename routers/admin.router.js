const router = require('express').Router();
var controller = require('../controllers/admin.controller');
var bookingController = require('../controllers/booking.controller');

router.get('/', function(req, res){
    res.render('admin/home');
})

router.get("/booking", bookingController.listBooking);


router.get("/booking/:id/delete", bookingController.deleteRegister);
router.post("/booking/:id/update", bookingController.updateRegister);

module.exports = router;
