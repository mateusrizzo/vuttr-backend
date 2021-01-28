import mongoose from 'mongoose';
import CreateUserService from './CreateUserService.js';
import AuthenticateUserService from './AuthenticateUserService.js';

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
		expect(response.user).toEqual(user);
	})

});