import User from '../models/User';
import {sign} from 'jsonwebtoken';
import authConfig from '../config/auth';

import IUserModel from '../@types/IUserModel';

interface IUser {
	username: string;
	password: string;
}

export default class AuthenticateUserService {
	async execute({username, password}: IUser) {
		const user = await User.findOne({username});

		if(!user) {
			throw new Error('Incorrect username and/or password');
		}

		if(password != user.password){
			throw new Error('Incorrect username and/or password');
		}

		const {secret, expiresIn} = authConfig.jwt;

		const token = sign({ }, secret, {
			subject: JSON.stringify(user._id),
			expiresIn,
		});

		return {user, token};
	}
}