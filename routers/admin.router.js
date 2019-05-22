const router = require('express').Router();
const controller = require('../controllers/admin.controller');
var bookingController = require('../controllers/booking.controller');
var recordController = require('../controllers/record.controller');

var timeController = require('../controllers/time.controller');
var doctorTimeController = require('../controllers/doctorTime.controller');

router.get('/', function(req, res){
    res.render('admin/home');
});

router.get("/booking", bookingController.listBooking);


router.get("/booking/:id/delete", bookingController.deleteRegister);
router.post("/booking/:id/update", bookingController.updateRegister);

router.get('/record/form', function(req, res){
    res.render('admin/formRecord');
});
router.post("/record/save", recordController.createRecord);


router.get('/time/form', function(req, res){
    res.render('admin/formTime');
})
router.post("/time/save",timeController.createTime);
router.get("/time", timeController.listTimeAdmin);

router.get('/doctor_time/form', function(req, res){
    res.render('admin/formDoctorTime');
})
router.post("/doctor_time/save",doctorTimeController.createDoctorTime);
router.get("/doctor_time", doctorTimeController.listDoctorTime);


// doctor create
router.route('/doctor/create')
    .get(controller.generateDoctorCreate)
    .post(controller.processDoctorCreate, controller.authenticateDoctorCreate);


module.exports = router;
