import mongoose from 'mongoose';

export default interface IUserModel extends mongoose.Model<any>{
	username: String;
	password: String;
}