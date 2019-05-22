var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.model');

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
      req.flash('dataForm', dataForm)

      return done(null, false, {
        message: 'Email đã được sử dụng, vui lòng chọn email khác'
      })
    }
    console.log(req.body)

    var newUser = new User();
    newUser.info.firstname = req.body.firstname;
    newUser.info.lastname = req.body.lastname;
    newUser.info.lastname = req.body.lastname;
    newUser.info.img = req.body.img;
    newUser.info.numbercmnd = req.body.numbercmnd;
    newUser.info.address = req.body.address;
    newUser.info.gender = req.body.gender;
    newUser.info.dob = req.body.dob;
    newUser.info.imgcmnn = req.body.imgcmnn;
    newUser.local.email = email;
    newUser.local.password = newUser.encryptPassword(password);

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