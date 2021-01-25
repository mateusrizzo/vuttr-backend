import {Schema, Model} from 'mongoose';

const ToolSchema = new Schema({
	title: String,
	link: String,
	description: String,
	tags: [String],
});

export default Model('Tool', ToolSchema);