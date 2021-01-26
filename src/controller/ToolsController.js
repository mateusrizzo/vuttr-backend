import Tool from '../models/Tool.js';
import CreateToolService from '../services/CreateToolService.js';

export default class ToolsController {
	async store(request, response) {
		const {title, link, description, tags} = request.body;
		const createTool = new CreateToolService();
		const newTool = createTool.execute({
			title,
			link,
			description,
			tags
		})
		response.status(201).json(newTool);
	}
	async find(request, response) {
		const {tag} = request.query;
		
		if (!tag) {
			const foundTools = await Tool.find();
			return response.status(200).json(foundTools)
		}

		const foundTools = await Tool.find({tags: tag});

		if (foundTools.length == 0){
			return response.status(404).json({error: 'Tool not found'});
		}
		response.status(200).json(foundTools);
	}
	async delete(request, response){
		const {id} = request.params;

		if (!id) {
			return response.status(400).json({error: 'Item id is required!'})
		}

		await Tool.findByIdAndDelete(id);

		response.status(204).json();
	}
}