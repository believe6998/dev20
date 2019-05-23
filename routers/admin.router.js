const router = require('express').Router();
const controller = require('../controllers/admin.controller');
const bookingController = require('../controllers/booking.controller');
const recordController = require('../controllers/record.controller');
const doctorController = require('../controllers/doctor.controller');
const timeController = require('../controllers/time.controller');
const doctorTimeController = require('../controllers/doctorTime.controller');
const accountController = require('../controllers/account.controller');


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

//time
router.get('/time/form', function(req, res){	
    res.render('admin/formTime');	
});
router.post("/time/save",timeController.createTime);	
router.get("/time", timeController.listTimeAdmin);	

 router.get('/doctor_time/form', function(req, res){	
    res.render('admin/formDoctorTime');	
});
router.post("/doctor_time/save",doctorTimeController.createDoctorTime);	
router.get("/doctor_time", doctorTimeController.listDoctorTime);

// doctor create
router.route('/doctor/create')
    .get(doctorController.generateDoctorCreate)
    .post(doctorController.processDoctorCreate, doctorController.authenticateDoctorCreate);
// // doctor list
// router.route('/doctor/list')
//     .get(doctorController.generateDoctorList);
// doctor edit
router.route('/doctor/edit/:id')
    .post(doctorController.processDoctorEdit);
// doctor delete
router.route('/doctor/delete/:id')
    .get(doctorController.processDoctorDelete);
// doctor detail
router.route('/doctor/detail/:id')
    .get(doctorController.generateDoctorDetail);

// account list
// doctor + admin + user
router.route('/account/list')
    .get(accountController.generateAccountList);




module.exports = router;
