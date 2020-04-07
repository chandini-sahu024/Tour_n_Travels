const express = require('express');


const morgan = require('morgan');


const bodyParser = require('body-parser') // Body parser module import

const mongoose = require('mongoose');

const packagesRoute = require('./api/routes/packages');
const bookingsRoute = require('./api/routes/bookings');
const userRoute = require('./api/routes/user');
const aboutRoute = require('./api/routes/about');
const contactRoute = require('./api/routes/contact');

const app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/uploads', express.static('uploads'));

mongoose.connect(
    'mongodb+srv://chandini:chicken123@cluster0-rhtbe.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }   
);
app.use(morgan('dev'));

// Body parser module
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use('/uploads', express.static('uploads'));

app.use('/packages', packagesRoute);
app.use('/bookings', bookingsRoute);
app.use('/user', userRoute);
app.use('/contact', contactRoute);
app.use('/about', aboutRoute);


app.use('/', (req, res, next) => {
    console.log("html page checking");
    return res.render('index.ejs');
});

app.use((req, res, next) => {
    const error = new Error('API Not found');
    console.log('Request received from client');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    console.log('Request received from client');
    res.status(error.status || 500);
    res.json({
        error : { 
        "message": error.message,
        "error" : "try again"
        }
    })
});

module.exports = app;