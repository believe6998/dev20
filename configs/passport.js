const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');
const cloudinary = require('cloudinary');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

//Passport register
passport.use('local.register', new LocalStrategy({
    usernameField: 'email',
    passswordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    User.findOne({
        'local.email': email
    }, function (err, user) {
        if (err) {
            return done(err)
        }
        if (user) {
            req.flash('dataForm', dataForm);
            return done(null, false, {
                message: 'Email has been used, please choose another email!'
            })
        }
        let newUser = new User();
        newUser.info.firstname = req.body.firstname;
        newUser.info.lastname = req.body.lastname;
        newUser.info.lastname = req.body.lastname;
        newUser.info.numbercmnd = req.body.numbercmnd;
        newUser.info.address = req.body.address;
        newUser.info.gender = req.body.gender;
        newUser.info.dob = req.body.dob;
        newUser.local.email = email;
        newUser.local.password = newUser.encryptPassword(password);
        let role = req.body.role;
        if (role.localeCompare("doctor") === 0) {
            newUser.doctor.specialties = req.body.specialties;
            newUser.doctor.desciption = req.body.desciption;
            newUser.isDoctor = true;
        }
        if (role.localeCompare("admin") === 0) {
            newUser.isAdmin = true;
        }
        let sync = false;
        if (req.files && req.files.img !== undefined) {
            let fileGettingUploaded = req.files.img.data;
            cloudinary.uploader
                .upload_stream(function (result, error) {
                    if (error) {
                        //xu ly loi
                        return done(error);
                    } else {
                        newUser.info.img =  result.url;
                    }
                })
                .end(fileGettingUploaded);
            sync = true;
        } else {
            newUser.info.img = "https://www.touchtaiwan.com/images/default.jpg";
            sync = true;
        }
        while(!sync){}
        newUser.save(function (err, result) {
            if (err) {
                return done(err);
            } else {
                return done(null, newUser);
            }
        });
    })
}));

/* Passport login */
passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    User.findOne({
        'local.email': email
    }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {
                message: 'Tài khoản này không tồn tại, vui lòng kiểm tra lại.'
            });
        }
        if (!user.validPassword(password)) {
            return done(null, false, {
                message: 'sai mật khẩu !'
            });
        }
        return done(null, user);
    });
}));