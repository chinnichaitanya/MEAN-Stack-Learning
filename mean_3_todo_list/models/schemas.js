var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
	task_id: String,
	name: String,
	content: String,
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: {
		type: Date,
		default: Date.now()
	}
});

var todo = mongoose.model('todo', todoSchema);

module.exports = todo;