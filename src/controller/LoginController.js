export default class LoginController {
	async create(request, response){
		const {username, password} = request.body;
		const createLogin = new CreateLoginService();
		try{
			const login = await createLogin.execute({
				username,
				password
			})
			response.status(200).json(login);
		} catch(error) {
			response.status(400).json(error.toString())
		}

	}
}