import User from '../models/User.js';
import authConfig from '../config/auth.js';

export default class CreateLoginService {
	async execute({username, password}) {
		const user = await User.findOne({username});

		return;
	}
}