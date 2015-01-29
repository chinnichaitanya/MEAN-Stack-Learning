var express = require('express'),
	indexControllers = require('../controllers/index');

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('pages/index', { title: 'My first ToDo project' });
});

router.route('/todo').all(indexControllers.todo);
router.route('/create').post(indexControllers.createPost);
router.route('/list').all(indexControllers.list);

module.exports = router;
