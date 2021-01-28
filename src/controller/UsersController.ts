import {Request, Response} from 'express';

import CreateUserService from '../services/CreateUserService';

export default class UsersController {
	async store(request: Request, response: Response){
		const {username, password} = request.body;
		const createUser = new CreateUserService();
		const newUser = await createUser.execute({
			username,
			password
		});
		response.status(201).json(newUser)
	}
}