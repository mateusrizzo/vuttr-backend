export default class UsersController {
	async store(request, response){
		const {username, password} = request.body;
		const createUser = new CreateUserService();
		const newUser = await createUser.execute({
			username,
			password
		});
		response.status(201).json(newUser)
	}
}