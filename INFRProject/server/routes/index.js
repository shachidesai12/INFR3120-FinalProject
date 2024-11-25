var express = require('express');
var router = express.Router();
let Expense = require('../model/expense.js')
/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home' });
});
/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Home' });
});
/*router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard' });
});*/

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
/* GET Help page. */
router.get('/help', function(req, res, next) {
  res.render('help', { title: 'Help' });
});

// Get router for login page
router.get('/login',indexController.displayLoginPage);

//post router for login page
router.post('/login',indexController.processLoginPage);

// Get router for registration page
router.get('/register',indexController.displayRegisterPage);

//post router for registration page
router.post('/register',indexController.processRegisterPage)
;
// Get router for logout page
router.get('/logout',indexController.performLogout);


module.exports = router;