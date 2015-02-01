var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	user_id: String,
	name: String,
	email: String,
	password: String,
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: {
		type: Date,
		default: Date.now()
	},
	is_logged_in: Boolean,
	is_logged_out: Boolean,
	subscribe: Boolean
});

var user = mongoose.model('user', userSchema);

module.exports = user;