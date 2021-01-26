import mongoose from 'mongoose';

const {Schema, model} = mongoose;

const UserSchema = new Schema({
	username: String,
	password: String
});

export default model('User', UserSchema);