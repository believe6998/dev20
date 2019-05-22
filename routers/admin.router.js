const router = require('express').Router();
var controller = require('../controllers/admin.controller');
var bookingController = require('../controllers/booking.controller');
var recordController = require('../controllers/record.controller');
var timeController = require('../controllers/time.controller');

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

router.get('/time/form', function(req, res){
    res.render('admin/formTime');
})
router.post("/time/save",timeController.createTime);
router.get("/time", timeController.listTimeAdmin);



module.exports = router;
