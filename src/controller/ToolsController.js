import Tool from '../models/Tool.js';

export default class ToolsController {
	async store(request, response) {
		const {title, link, description, tags} = request.body;
		const newTool = await Tool.create({
			title,
			link,
			description,
			tags
		});
		response.status(201).json(newTool);
	}
	async find(request, response) {
		const {tag} = request.query;
		const foundTools = await Tool.find({tags: tag});

		if (foundTools.length == 0){
			return response.status(404).json({error: 'Tool not found'});
		}
		response.status(200).json(foundTools);
	}
}