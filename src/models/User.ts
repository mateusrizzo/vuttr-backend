import {Schema, model} from 'mongoose';

import IUserModel from '../@types/IUserModel';

const UserSchema = new Schema({
	username: String,
	password: String
});

export default model<any, IUserModel>('User', UserSchema);