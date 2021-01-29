import Tool from '../models/Tool';

export default class ListToolsService{
	async execute(tag: string, user_id: string) {

		const toolsByUser = await Tool.find({user: user_id});
		
		if (tag === 'invalid') {
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