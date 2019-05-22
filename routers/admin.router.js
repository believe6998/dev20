const router = require('express').Router();
const controller = require('../controllers/admin.controller');
const bookingController = require('../controllers/booking.controller');
const recordController = require('../controllers/record.controller');
const doctorController = require('../controllers/doctor.controller');


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

// doctor create
router.route('/doctor/create')
    .get(doctorController.generateDoctorCreate)
    .post(doctorController.processDoctorCreate, doctorController.authenticateDoctorCreate);
// doctor list
router.route('/doctor/list')
    .get(doctorController.generateDoctorList)
    .post(doctorController.processDoctorList);

module.exports = router;
