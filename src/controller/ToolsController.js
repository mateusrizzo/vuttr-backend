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
}