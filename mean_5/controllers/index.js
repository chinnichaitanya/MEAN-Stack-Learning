// var flash = require('connect-flash');
var passport = require('../config/passport');

exports.index = function (req, res) {
  res.render('pages/index', {
    title: 'Mean 5 - Index',
  });
};

exports.loginGet = function(req, res, next) {
	res.render('pages/login', { 
		title: 'Login page'
		// message: res.flash('loginMessage'), 
	});
};

exports.signupGet = function(req, res, next) {
	res.render('pages/signup', { 
		title: 'SignUp page'
		// message: req.flash('loginMessage'), 
	});
};

exports.profile = function(req, res, next) {
	if(req.isAuthenticated()) {
		res.render('pages/profile', { 
			title: 'Profile page',
			user: req.user
		});
	} else {
		console.log('Not authenticated...redirecting to login page');
		res.redirect('/login');
	}
};

exports.logout = function(req, res, next) {
	req.logout();
	console.log('Logging out');
	res.redirect('/');
};	

exports.signupPost = function(req, res, next) {
	passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true
	});
};