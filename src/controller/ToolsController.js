import Tool from '../models/Tool.js';
import CreateToolService from '../services/CreateToolService.js';
import ListToolsService from '../services/ListToolsService.js'

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
		const listTools = new ListToolsService();
		const toolsList = listTools.execute(tag);
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