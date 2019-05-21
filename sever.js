const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin123@ds157946.mlab.com:57946/dev20', {useNewUrlParser: true});

var adminRouter = require('./routers/admin.router');

var bookingRouter = require('./routers/booking.router');

var userRouter = require('./routers/user.router');


const app = express();
var post = process.env.PORT || 3002;

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/admin', adminRouter);
app.use('/user', userRouter); // cấu hình mấy trang liên quan user
app.use('/', bookingRouter);

app.get('/',function (req,res) {
    res.render('client/home');
})

// Trả lỗi 404 k tồn tại trang!!!!!
app.use(function (req, res, next) {
    var err = new Error('Lỗi 404 ! Éo tìm đc trang!');
    err.status = 404;
    next(err);
});

// Trả lỗi 500
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});


app.listen(post, () => console.log(`Chạy thành Công ở cổng ${post}`));



