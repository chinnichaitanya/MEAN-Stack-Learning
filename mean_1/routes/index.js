var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET helloworld page */
router.get('/helloworld', function(req, res, next) {
	res.render('helloworld', { title: 'Hello World !' });
});

/* GET userlist page */
router.get('/userlist', function(req, res, next) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({}, {}, function(e, docs) {
		res.render('userlist', {
			userlist: docs,
			title: 'User List'
		});
	});
});

/* GET new user data */
router.get('/register', function(req, res, next) {
	res.render('register', { 
		title: 'Registration Page', 
		heading: 'Fill Details'
	});
});

/* POST to add user details to our db */
router.post('/adduser', function(req, res, next) {

	// Set our internal db varialbe
	var db = req.db;

	// Get our form values, they depend on the 'name' attribute
	var username = req.body.name;
	var useremail = req.body.email;

	// Set our user data collection
	var collection = db.get('usercollection');

	// Submit to db
	collection.insert({
		"username": username,
		"email": useremail
	}, function(err, doc) {
		if(err) {
			res.send('Adding you to our database failed! Please try later!');
		} else {
			// If it worked, then change the header so that address bar still doesnt say '/adduser'
			res.location("userlist");
			
			// Redirect to success page
			res.redirect("userlist");
		}
	});

});

module.exports = router;
