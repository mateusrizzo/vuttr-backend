import AuthenticateUserService from '../services/AuthenticateUserService.js'

export default class LoginController {
	async create(request, response){
		const {username, password} = request.body;
		const authenticateUser = new AuthenticateUserService();
		try{
			const login = await authenticateUser.execute({
				username,
				password
			})
			response.status(200).json(login);
		} catch(error) {
			response.status(400).json(error.toString())
		}

	}
}