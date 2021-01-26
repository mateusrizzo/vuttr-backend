import Tool from '../models/Tool.js';

export default class DeleteToolsService{
	async execute(id){

		if (!id) {
			return response.status(400).json({error: 'Item id is required!'})
		}

		await Tool.findByIdAndDelete(id);

		return;
	}
}