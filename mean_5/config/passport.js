var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');

var User = require('../models/participants');

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		console.log('Serializing user');
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		console.log('Deserializing user');
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, email, password, done) {
		// for asynchronous
		process.nextTick(function() {
			User.findOne({ 'local.email': email }, function(err, user) {
				if(err) {
					console.log('Error in connexting to database');
					return done(err);
				} 
				if(user) {
					console.log('User already exists');
					return done(null, false);
				} else {
					var newUser = new User();
					newUser.local.email = email;
					newUser.local.password = newUser.generateHash(password);

					newUser.save(function(err) {
						if(err) {
							console.log('Error in saving new user : ');
							console.log(err);
						} else {
							console.log('Successfully created new user');
							return done(null, newUser);
						}
					});
				}
			});
		});
	}

	));
};