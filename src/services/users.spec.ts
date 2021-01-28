import mongoose from 'mongoose';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

let createUser;
let authenticateUser;

describe('Users', () => {
	let connection;

	beforeEach(() => {
		createUser = new CreateUserService();
		authenticateUser = new AuthenticateUserService();
	})

	beforeAll(async () => {
		connection = await mongoose.connect('mongodb+srv://admin:OCvCYBbdUCwo39Gp@vuttr.gjxmq.mongodb.net/test?retryWrites=true&w=majority', {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
	});

	afterEach(async () => {
		await mongoose.connection.db.collection('users').deleteMany({});
	})

	afterAll(async () => {
		await connection.close();
	});
	
	it('should be able to create a user', async () => {
		const mockUser = {
			username: 'some user',
			password: '1234'
		}
		const user = await createUser.execute(mockUser);

		expect(user).toHaveProperty('_id');
	})

	it('should be able to login', async () => {
		const mockUser = {
			username: 'some user',
			password: '1234'
		}

		const user = await createUser.execute(mockUser);
		
		const response = await authenticateUser.execute(mockUser);

		expect(response).toHaveProperty('token');
		expect(response.user.username).toEqual(user.username);
	})

	it('should not be able to authenticate a user with a invalid username', async () => {
		const mockUser = {
			username: 'some user',
			password: '1234'
		}

		await createUser.execute(mockUser);

		await expect(authenticateUser.execute({username: 'invalid_user', password: '1234'})).rejects.toBeInstanceOf(Error);
	})
	it('should not be able to authenticate a user with invalid password', async () => {
		const mockUser = {
			username: 'some user',
			password: '1234'
		}

		await createUser.execute(mockUser);

		await expect(authenticateUser.execute({username: 'some_user', password: 'wrong_password'})).rejects.toBeInstanceOf(Error);
	})

});