import CreateToolService from '../services/CreateToolService.js';
import ListToolsService from '../services/ListToolsService.js';
import DeleteToolsService from '../services/DeleteToolsService.js';

export default class ToolsController {
	async store(request, response) {
		const {title, link, description, tags} = request.body;
		const createTool = new CreateToolService();
		const newTool = await createTool.execute({
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
		try{
			const toolsList = await listTools.execute(tag);
			response.status(200).json(toolsList);
		} catch(err) {
			response.json(err);
		}
	}
	async delete(request, response){
		const {id} = request.params;
		const deleteTool = new DeleteToolsService();
		try{
			await deleteTool.execute(id);
			response.status(204).json();
		} catch(err) {
			console.log(err)
			response.status(400).json(err);
		}
	}
}