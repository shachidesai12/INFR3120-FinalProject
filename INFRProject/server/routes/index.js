var express = require('express');
var router = express.Router();

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Home' });
});
/* GET dashboard us page. */
router.get('/dashboard', function(req, res, next) {
  res.render('index', { title: 'dashboard' });
});
/* GET Help page. */
router.get('/help', function(req, res, next) {
  res.render('help', { title: 'Help' });
});


module.exports = router;
