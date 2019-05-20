const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 

// mongoose.connect('mongodb://chailo:chailo123@ds163014.mlab.com:63014/mydb', { useNewUrlParser: true });

var adminRouter = require('./routers/admin.router');

const app = express();
var post = process.env.PORT || 3002;

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/admin', adminRouter);


app.get('/', function (req, res) {
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



