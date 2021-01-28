import {Schema, model} from 'mongoose';

const ToolSchema = new Schema({
	title: String,
	link: String,
	description: String,
	tags: [String],
});

export default model('Tool', ToolSchema);