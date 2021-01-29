import mongoose from 'mongoose';

import Tool from '../models/Tool';

interface ITool {
	title: string;
	link: string;
	description: string;
	tags: string[];
	user_id: string;
}

export default class CreateToolService{
	async execute({title, link, description, tags, user_id}: ITool) {

		const newTool = await Tool.create({
			title,
			link,
			description,
			tags,
			user: user_id
		});
		return newTool;
	}
}