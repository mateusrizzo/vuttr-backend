import Tool from '../models/Tool.js';

export default class ListToolsService{
	async execute(tag) {
		
		if (!tag) {
			const foundTools = await Tool.find();
			return response.status(200).json(foundTools)
		}

		const foundTools = await Tool.find({tags: tag});

		if (foundTools.length == 0){
			return response.status(404).json({error: 'Tool not found'});
		}

		return foundTools;
	}
}