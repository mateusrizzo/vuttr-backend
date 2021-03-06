import Tool from '../models/Tool';

export default class ListToolsService{
	async execute(user_id: string, tag?: string) {

		const toolsByUser = await Tool.find({user: user_id});
		
		if (!tag) {
			return toolsByUser;
		}

		const foundTools = toolsByUser.filter((tool) => {
			if (tool.tags.includes(tag)) {
				return tool;
			}
		});

		if (foundTools.length == 0){
			throw new Error('Tool not found');
		}

		return foundTools;
	}
}