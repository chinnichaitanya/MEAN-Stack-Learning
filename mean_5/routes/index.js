var express = require('express'),
	indexControllers = require('../controllers/index.js');

// var flash = require('connect-flash');	

var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.route('/').all(indexControllers.index);
router.route('/login').get(indexControllers.loginGet);
router.route('/signup').get(indexControllers.signupGet);
router.route('/profile').get(indexControllers.profile);

router.route('/logout').get(indexControllers.logout);

router.route('/signup').post(indexControllers.signupPost);

module.exports = router;
