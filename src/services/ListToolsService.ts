import Tool from '../models/Tool';

export default class ListToolsService{
	async execute(tag: string, user_id: string) {

		const toolsByUser = await Tool.find({user: user_id});

		const parsedTag = tag.replace(/^"(.*)"$/, '$1')
		
		if (parsedTag === 'invalid') {
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