var mongoose = require('mongoose');
var todoModel = require('../models/schemas');

exports.todo = function(req, res, next) {
	res.render('pages/todo', {
		title: 'ToDo List'
	});
};

exports.createPost = function(req, res, next) {
	var task = new todoModel({
		name: req.body.Name,
		content: req.body.Content
	});
	task.save(function(err) {
		if(!err) {
			console.log('Task created successfully');
			res.redirect('/list');
		} else {
			console.log('Error saving task :');
			console.log(err);
			res.redirect('/list');
		}
	});
};

exports.list = function(req, res, next) {
	var task = mongoose.model('todo');		//what the hell ???
	task.find(function(err, result) {
		if(err) {
			console.log('Error in fetching tasks');
			console.log(err);
		} else {
			res.render('pages/list', {
				title: 'List of the Tasks',
				content: result
			});
		}
	});
};
