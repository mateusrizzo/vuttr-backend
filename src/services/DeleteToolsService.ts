import mongoose from 'mongoose';
import Tool from '../models/Tool';

export default class DeleteToolsService{
	async execute(id: string, user_id: string){
		
		const isIdValid = mongoose.Types.ObjectId.isValid(id);

		if (isIdValid === false) {
			throw new Error('Invalid tool ID!');
		}

		const toolForDeletion = await Tool.findOne({_id: id});

		if(!toolForDeletion){
			throw new Error('Tool not found!');
		}

		if(toolForDeletion.user != user_id){
			throw new Error("You don't have the credentials to delete this tool")
		}

		await Tool.findByIdAndDelete(id);

		return;
	}
}