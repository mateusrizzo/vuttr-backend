import {Request, Response} from 'express';

import CreateToolService from '../services/CreateToolService';
import ListToolsService from '../services/ListToolsService';
import DeleteToolsService from '../services/DeleteToolsService';


export default class ToolsController {
	async store(request: Request, response: Response) {
		const {title, link, description, tags} = request.body;
		const user_id = request.user.id;
		const createTool = new CreateToolService();
		const newTool = await createTool.execute({
			title,
			link,
			description,
			tags,
			user_id
		})
		response.status(201).json(newTool);
	}
	async find(request: Request, response: Response) {
		const {tag} = request.query;
		const user_id = request.user.id;
		const listTools = new ListToolsService();
		try{
			const toolsList = await listTools.execute(user_id, String(tag));
			response.status(200).json(toolsList);
		} catch(error) {
			response.status(404).json(error.toString());
		}
	}
	async delete(request: Request, response: Response){
		const {id} = request.params;
		const user_id = request.user.id;
		const deleteTool = new DeleteToolsService();
		try{
			await deleteTool.execute(id, user_id);
			response.status(204).json();
		} catch(error) {
			response.status(400).json(error.toString());
		}
	}
}