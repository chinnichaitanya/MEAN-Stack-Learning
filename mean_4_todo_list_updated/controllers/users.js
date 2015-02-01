var mongoose = require('mongoose');
var userModel = require('../models/userSchemas');

exports.register_login = function(req, res, next) {
	res.render('pages/registerAndlogin', {
		title_1: 'Registration',
		title_2: 'Login'
	});
};

exports.create = function(req, res, next) {
	var user = new userModel({
		name: req.body.userName,
		email: req.body.userEmail,
		is_logged_in: 1,
		is_logged_out: 0,
		subscribe: 1
	});
	user.save(function(err) {
		if(!err) {
			console.log('User created successfully');
			res.redirect('/users/home/');
		} else {
			console.log('Error saving user :');
			console.log(err);
			res.redirect('/new');
		}		
	});
};

exports.create = function(req, res, next) {
	sess = req.session;
	sess.email = req.body.email;
};
