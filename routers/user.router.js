const router = require('express').Router();
var passport = require('passport');

router.route('/register')
    .get(function (req, res) {
        var messages = req.flash('error');
        dataForm = {
            firstname: '',
            lastname: '',
            email: '',
            numbercmnd: '',
            address: '',
            gender: '',
            img: '',
            dob: '',
            imgcmnn: '',
            email: '',
            password: ''
        }

        res.render('client/register', {
            messages: messages,
            hasErrors: messages.length > 0,
            dataForm: dataForm
        });
    })

    .post(function (req, res, next) {
        // form values
        
        //check form validation
        req.checkBody("firstname", "firstname is required").notEmpty();
        req.checkBody("lastname", "lastname is required").notEmpty();
        req.checkBody("email", "email is invalid").isEmail();
        req.checkBody("password", "password is required").notEmpty();
        req.checkBody("password", 'Xác nhận mật khẩu không giống nhau, vui lòng kiểm tra lại.').equals(req.body.password_confirmation);
        //check for errors
        var errors = req.validationErrors();

        dataForm = req.body

        if (errors) {
            var messages = [];
            errors.forEach(function (error) {
                messages.push(error.msg);
            });
            res.render('client/register.ejs', {
                messages: messages,
                hasErrors: messages.length > 0,
                dataForm: dataForm
            });
        } else {
            next()
        }
    }, passport.authenticate('local.register', {
        successRedirect: '/user/login',
        failureRedirect: '/user/register',
        failureFlash: true
    }))


router.route('/login')
    .get(function (req, res) {
        var messages = req.flash('error');

        res.render('client/login', {
            messages: messages,
            hasErrors: messages.length > 0,
            user:req.user
        });

    })
    .post(passport.authenticate('local.login', {
        successRedirect: '/',
        failureRedirect: '/user/login',
        failureFlash: true
    }))

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;

