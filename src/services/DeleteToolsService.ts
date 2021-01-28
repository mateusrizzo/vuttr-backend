import mongoose from 'mongoose';
import Tool from '../models/Tool';

export default class DeleteToolsService{
	async execute(id){

		if (!id) {
			return Promise.reject().catch(err => {
				throw new Error('Tool ID is required!');
			})
		}
		const isIdValid = mongoose.Types.ObjectId.isValid(id);

		if (isIdValid === false) {
			throw new Error('Invalid tool ID!');
		}

		const toolForDeletion = await Tool.exists({_id: id});

		if(toolForDeletion === false){
			throw new Error('Tool not found!');
		}

		await Tool.findByIdAndDelete(id);

		return;
	}
}