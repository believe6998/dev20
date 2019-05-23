const passport = require('passport');
const userModel = require('../models/user.model');
require('mongoose-pagination');

// create account
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

// get list
exports.generateDoctorList = (req, res)=>{
    let option = {isDoctor: true, 'info.status': 1};
    let page = req.query.page;
    if( typeof page == "undefined" ){
        page = 1;
    }
    // let limit = req.query.limit;
    let limit = 10;
    userModel.find(option).paginate(parseInt(page), parseInt(limit), function(err, list, total) {
        if(err){
            //handle err
            res.send(err)
        }
        let resData = {
            'list': list,
            'total': total,
            'totalPage': Math.ceil(total/limit),
            'page': page,
            'limit': limit
        };
        res.render('admin/doctorList', resData);
    })
};

// detail page
exports.generateDoctorDetail = function (req, res) {
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
    userModel.findById(req.params.id, function (err, obj) {
        if (err) {
            return res.status(500).send(err);
        } else {
            let resData = {
                obj: obj,
                header: 'Detail Doctor Account',
                messages: messages,
                hasErrors: messages.length > 0,
                dataForm: req.body,
                user: req.user
            };
            res.render('admin/accountDetail', resData);
        }
    });
};

// mid edit
exports.midDoctorEdit = function (req, res) {
    // form values
    //check form validation
    // req.checkBody("email", "Email is invalid").isEmail();
    // //check for errors
    // let errors = req.validationErrors();
    // if (errors) {
    //     let messages = [];
    //     errors.forEach(function (error) {
    //         messages.push(error.msg);
    //     });
    //
    //     userModel.findById(req.params.id, function (err, obj) {
    //         if (err) {
    //             return res.status(500).send(err);
    //         } else {
    //             let resData = {
    //                 obj: obj,
    //                 header: 'Detail Doctor Account',
    //                 messages: messages,
    //                 hasErrors: messages.length > 0,
    //                 dataForm: req.body,
    //                 user: req.user
    //             };
    //             res.render('admin/accountDetail', resData);
    //         }
    //     });
    // } else {
        next()
    // }
};

// edit update
exports.processDoctorEdit = function (req, res) {

    let updateData = {
        'info.firstname': req.body.firstname,
        'info.lastname': req.body.lastname,
        'info.updateAt': new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    };
    console.log(req.params.id);
    userModel.findByIdAndUpdate(
        req.params.id,
        updateData,
        {new: false},
        function (err, obj) {
            if (err) {
                // return res.status(500).send(err);
                res.send("update err")
            } else {
                console.log("ok" + obj.info.firstname);
                // let resData = {
                //     obj: obj,
                //     header: 'Detail Doctor Account (Update success.)',
                //     messages: messages,
                //     hasErrors: messages.length > 0,
                //     dataForm: req.body,
                //     user: req.user
                // };

                // res.redirect('admin/doctor/detail/' + req.id);
            }
        });
};

// Delete Account
exports.processDoctorDelete = function (req, res) {
    let updateData = {
        'info.status': 0,
        'info.deleteAt': new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    };
    userModel.findByIdAndUpdate(
        req.params.id, updateData,
        {new: false},
        function (err, obj) {
            if (err) {
                //handle err
            } else {
                // res.redirect('/admin/doctor/delete/sucess');
                res.send('delete ok')
            }
        });
};