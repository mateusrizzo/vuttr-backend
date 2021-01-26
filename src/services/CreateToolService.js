import Tool from '../models/Tool.js';

export default class CreateToolService{
	async execute({title, link, description, tags}) {
		const newTool = await Tool.create({
			title,
			link,
			description,
			tags
		});
		return newTool;
	}
}