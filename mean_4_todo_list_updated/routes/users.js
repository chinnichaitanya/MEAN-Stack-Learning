var express = require('express'),
	userControllers = require('../controllers/users');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.route('/new').all(userControllers.register_login);
router.route('/createUser').post(userControllers.create);
router.route('home/').all(userControllers.home);

module.exports = router;
