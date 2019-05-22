const passport = require('passport');

// Create
exports.generateDoctorCreate = (req, res) => {
    let messages = req.flash('error');
    dataForm = {
        specialties: '',
        desciption: '',
        firstname: '',
        lastname: '',
        email: '',
        numbercmnd: '',
        address: '',
        gender: '',
        img: '',
        dob: '',
        imgcmnn: '',
        password: ''
    };
    res.render('admin/doctorCre', {
        messages: messages,
        hasErrors: messages.length > 0,
        dataForm: dataForm,
        user: req.user
    });
};

exports.processDoctorCreate = (req, res, next) => {
    // form values
    //check form validation
    req.checkBody("specialties", "Specialties is required").notEmpty();
    req.checkBody("desciption", "Description is required").notEmpty();
    req.checkBody("firstname", "FirstName is required").notEmpty();
    req.checkBody("lastname", "LastName is required").notEmpty();
    req.checkBody("email", "Email is invalid").isEmail();
    req.checkBody("password", "Password is required").notEmpty();
    req.checkBody("password", 'Confirm password and password are not the same, please check again.').equals(req.body.password_confirmation);
    //check for errors
    let errors = req.validationErrors();
    dataForm = req.body;
    if (errors) {
        let messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        res.render('admin/doctorCre', {
            messages: messages,
            hasErrors: messages.length > 0,
            dataForm: dataForm,
            user: req.user
        });
    } else {
        next()
    }
};

exports.authenticateDoctorCreate = passport.authenticate('local.register', {
    successRedirect: '/admin/doctor/list',
    failureRedirect: '/admin/doctor/create',
    failureFlash: true
});



exports.generateDoctorList = (req, res)=>{
    res.render('admin/doctorList');
};

exports.processDoctorList = (req, res)=> {
    res.send('ok');
};