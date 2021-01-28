import mongoose from 'mongoose';

export default interface IToolModel extends mongoose.Model<any>{
	title: String,
	link: String,
	description: String,
	tags: String[],
}