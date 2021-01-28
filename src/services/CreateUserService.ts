import User from '../models/User';

export default class CreateUserService{
	async execute({username, password}){
		const newUser = await User.create({
			username,
			password
		})
		return newUser;
	}
}