var express = require('express');
var router = express.Router();
const passport = require('passport');
const DB = require('../config/db');
let userModel = require('../model/user');
let user = userModel.user;
let Expense = require('../model/expense.js')
/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home', displayName: req.user ? req.user.displayName:''});
});
/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Home', displayName: req.user ? req.user.displayName:'' });
});

router.get('/dashboard',async(req,res,next)=>{
  try{
      const Datalist = await Expense.find();
      res.render('dashboard',{
          title:'dashboard',
          Datalist:Datalist
      })
  }
  catch(err){
      console.error(err)
      res.render('Expense/list',{
          error:'Error on Server'})
  }
})

// router.get('/dashboard', async (req, res, next) => {
//   try {
//       const Datalist = await Expense.find(); // Fetch expenses from the database
//       res.render('Expense/list', {
//           title: 'Expense List',
//           ExpenseList: expenses // Pass the data to the template
//       });
//   } catch (err) {
//       console.error(err);
//       res.render('Expense/list', {
//           title: 'Error',
//           error: 'Error fetching expenses',
//           ExpenseList: [] // Pass an empty list as a fallback
//       });
//   }
// });

/* GET Help page. */
router.get('/help', function(req, res, next) {
  res.render('help', { title: 'Help', displayName: req.user ? req.user.displayName:'' });
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect to dashboard
        res.redirect('/dashboard');
    }
);

// Logout route
router.get('/logout', (req, res, next) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect('/');
    });
});

// Get router for login page
/* GET login page. */
router.get('/login', function(req, res, next) {
  if(!req.user)
  {
    res.render('Auth/login',
      {
        title:'Login',
        message:req.flash('loginMessage'),
        displayName: req.user ? req.user.displayName:''
      }
    )
  }
  else
  {
    return res.redirect('/')
  }
})

//post router for login page
router.post('/login', function(req,res,next){
  passport.authenticate('local',(err,user,info)=>{
    if(err)
    {
      return next(err)
    }
    if(!user)
    {
      req.flash('loginMssage','Authentication Error');
      return res.redirect('/login');
    }
    req.login(user,(err)=>{
      if (err)
      {
        return next (err)
      }
      return res.redirect('/transactions')
    })
  })(req,res,next)
})

// Get router for registration page
router.get('/register',function(req,res,next){
  if(!req.user)
  {
    res.render('Auth/register',{
      title:'Register',
      message:req.flash('registerMessage'),
      displayName: req.user?req.user.displayName:''    //if user exists show displayName else nothing, since we only have two statemnets can use ? instead of if else
    })
  } 
  else{
    return res.redirect('/')
  }
})
//post router for registration page
router.post('/register',function(req,res,next){
  let newUser =  new user({
    username: req.body.username,
    //password: req.body.password,
    email: req.body.email,
    displayName: req.body.displayName
  })
  user.register(newUser,req.body.password,(err) => {
    console.log(newUser)
    if(err)
    {
      console.log("Error: Inserting new user");
      if(err.name=="UserExistError")
      {
        req.flash('registerMessage','Registration Error: User already exists')
      }
      return res.render('auth/register',{
        title:'Register',
        message: req.flash('registerMessage'),
        displayName:req.user?req.user.displayName:''
      })
    }
    else 
    {
      return passport.authenticate('local')(req,res,() =>{
        res.redirect('/transactions')
      })
    }
  })
})

// Get router for logout page
router.get('/logout',function(req,res,next){
  req.logOut(function(err){
    if(err)
    {
      return next(err);
    }
  })
  res.redirect('/')
})
module.exports = router;