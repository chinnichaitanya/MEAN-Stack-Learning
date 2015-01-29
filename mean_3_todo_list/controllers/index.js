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
		content: req.body.Content,
		done: 0
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
	// var check = req.params.status;
	var tasks = mongoose.model('todo');		// to fetch the data
	tasks.find(function(err, result) {
		if(err) {
			console.log('Error in fetching tasks :');
			console.log(err);
			res.redirect('/');
		} else {
			res.render('pages/list', {
				title: 'List of the Tasks pending',
				content: result,
				// see: check
			});
		}
	});
};

exports.deleteTask = function(req, res, next) {
	var id = req.params.id;
	var tasks = mongoose.model('todo');
	// tasks.find({ _id: id }, function(err, deleteTask) {
	// 	if(err) {
	// 		console.log('Error occurred in fetching the task to be deleted');
	// 		console.log(err);
	// 		res.redirect('/list');
	// 	} else {
	// 		deleteTask.remove(function(err) {
	// 			if(err) {
	// 				console.log('Error in deleting the task');
	// 				console.log(err);
	// 				res.redirect('/list');
	// 			} else {
	// 				console.log('Task successfully deleted');
	// 				res.redirect('/list');
	// 			}
	// 		});
	// 	}
	// });
	tasks.findOneAndRemove({ _id: id }, function(err) {
		if(err) {
			console.log('Error in deleting the task');
			res.redirect('/list');
		} else {
			console.log('Successfully deleted the task');
			res.redirect('/list');
		}
	});
};

exports.markDone = function(req, res, next) {
	var id = req.params.id;
	var tasks = mongoose.model('todo');
	// tasks.find({ _id: id }, function(err, completedTask) {
	// 	if(err) {
	// 		console.log('Error in finding the task to be updated');
	// 		console.log(err);
	// 		res.redirect('/list');
	// 	} else {
	// 		completedTask.done = 1;
	// 		completedTask.save(function(err) {
	// 			if(err) {
	// 				console.log('Error in saving the updated task');
	// 				console.log(err);
	// 				res.redirect('/list');					
	// 			} else {
	// 				console.log('Successfully updated the task');
	// 				res.redirect('/list');
	// 			}
	// 		});
	// 	}
	// });
	tasks.findOneAndUpdate({ _id: id }, { done: 1, updatedAt: Date.now() }, function(err, taskUpdated) {
		if(err) {
			console.log('Error in updating the task');
			console.log('err');
			res.redirect('/list');
		} else {
			console.log('Task successfully marked as completed');
			console.log(taskUpdated);
			res.redirect('/list');
		}
	});
};

exports.edit = function(req, res, next) {
	var id = req.params.id;
	var tasks = mongoose.model('todo');		// to fetch the data
	tasks.find({ _id: id }, function(err, result) {
		if(err) {
			console.log('Error in fetching tasks :');
			console.log(err);
			res.redirect('/list');
		} else {
			// console.log(result);
			res.render('pages/edit', {
				title: 'Edit the task',
				oldContent: result
			});
		}
	});
};

exports.update = function(req, res, next) {
	var id = req.params.id;
	var tasks = mongoose.model('todo');		// to fetch the data
	tasks.findOneAndUpdate({ _id: id }, 
		{ name: req.body.Name_new, content: req.body.Content_new, updatedAt: Date.now() }, 
		function(err, taskUpdated) {
		if(err) {
			console.log('Error in updating the task');
			console.log('err');
			res.redirect('/list');
		} else {
			console.log('Task successfully updated');
			console.log(taskUpdated);
			res.redirect('/list');
		}
	});
};