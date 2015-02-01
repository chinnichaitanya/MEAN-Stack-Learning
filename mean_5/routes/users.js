var express = require('express'),
	usersControllers = require('../controllers/users');

var router = express.Router();
// var passport = require('/config/passport.js');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.route('/').all(usersControllers.index);

module.exports = router;
