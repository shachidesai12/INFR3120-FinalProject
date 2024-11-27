require('dotenv').config();

console.log('Client ID:', process.env.clientID);
console.log('Client Secret:', process.env.clientSecret);

// import dotenv from 'dotenv';
// dotenv.config();

// const config ={

// }

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let app = express();
let cors = require('cors')
//creat a user model instance
let userModel = require('../model/user');
let user=userModel.user;

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let expenseRouter = require('../routes/expense');

//Libraries required before performing authentication 
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');


let flash = require('connect-flash');
passport.use(user.createStrategy());
let localStrategy = passportLocal.Strategy;

//google authentication
const GoogleStrategy = require('passport-google-oauth20').Strategy;

console.log('Client ID:', process.env.clientID);
console.log('Client Secret:', process.env.clientSecret);
passport.use(new GoogleStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: "https://infr3120-finalproject-1.onrender.com/transactions"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Your logic to find or create the user
    done(null, profile);
  } catch (err) {
    done(err);
  }
}));

console.log('Client ID:', process.env.clientID);
  console.log('Client Secret:', process.env.clientSecret);

let mongoose = require('mongoose');
let DB = require('./db');
// point my mongoose to the URI
mongoose.connect(DB.URI);

let mongoDB = mongoose.connection;
mongoDB.on('error',console.error.bind(console,'Connection Error'))
mongoDB.once('open',()=>{
  console.log('MongoDB Connected')
})
mongoose.connect(DB.URI,{useNewURIParser:true,
  useUnifiedTopology:true
})

//set-up express session
app.use(session({
  secret:"SomeSecret",
  saveUninitialized:false,
  resave:false
}))

//initialize the flash
app.use(flash());
// sereialze and deserialize the user information
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
//initialize passport
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/transactions',expenseRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{title:'Error'});
});

module.exports = app;
