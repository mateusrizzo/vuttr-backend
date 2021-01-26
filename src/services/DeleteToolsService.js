import Tool from '../models/Tool.js';

export default class DeleteToolsService{
	async execute(id){

		if (!id) {
			throw new Error('Item id is required!');
		}

		const toolForDeletion = await Tool.findById(id);

		if(!toolForDeletion){
			throw new Error('Invalid tool id!');
		}

		await Tool.deleteOne(toolForDeletion);

		return;
	}
}