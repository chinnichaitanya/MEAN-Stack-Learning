var express = require('express'),
	indexControllers = require('../controllers/index');

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('pages/index', { title: 'My first ToDo project' });
});

router.route('/todo').all(indexControllers.todo);
router.route('/create').post(indexControllers.createPost);
router.route('/list/:status').all(indexControllers.list);
// router.route('/list').all(indexControllers.list);
router.route('/deleteTask/:id').get(indexControllers.deleteTask);
router.route('/markDone/:id').get(indexControllers.markDone);
router.route('/edit/:id').get(indexControllers.edit);
router.route('/update/:id').post(indexControllers.update);

module.exports = router;
