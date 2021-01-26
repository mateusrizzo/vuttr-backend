import mongoose from 'mongoose';

const {Schema, model} = mongoose;

const UserSchema = new Schema({
	username: string,
	password: string
});

export default model('User', UserSchema);