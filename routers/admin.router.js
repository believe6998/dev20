const router = require('express').Router();
var controller = require('../controllers/admin.controller');
var bookingController = require('../controllers/booking.controller');
var recordController = require('../controllers/record.controller');


router.get('/', function(req, res){
    res.render('admin/home');
})

router.get("/booking", bookingController.listBooking);


router.get("/booking/:id/delete", bookingController.deleteRegister);
router.post("/booking/:id/update", bookingController.updateRegister);

router.get('/record/form', function(req, res){
    res.render('admin/formRecord');
})
router.post("/record/save", recordController.createRecord);

module.exports = router;
