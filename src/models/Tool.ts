import {Schema, model} from 'mongoose';

import IToolModel from '../@types/IToolModel';

const ToolSchema = new Schema({
	title: String,
	link: String,
	description: String,
	tags: [String],
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

export default model<any, IToolModel>('Tool', ToolSchema);