const {Schema, Model} = require('mongoose');

const ToolSchema = new Schema({
	title: String,
	link: String,
	description: String,
	tags: [String],
});

module.exports = Model('Tool', ToolSchema);