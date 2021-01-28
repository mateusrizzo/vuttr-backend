import Tool from '../models/Tool';

export default class ListToolsService{
	async execute(tag) {
		
		if (!tag) {
			const foundTools = await Tool.find();
			return foundTools;
		}

		const foundTools = await Tool.find({tags: tag});

		if (foundTools.length == 0){
			throw new Error('Tool not found');
		}

		return foundTools;
	}
}