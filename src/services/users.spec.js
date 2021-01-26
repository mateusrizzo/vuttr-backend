import mongoose from 'mongoose';
import CreateUserService from './CreateUserService.js';


let createUser

describe('Users', () => {
	let connection;

	beforeEach(() => {
		createUser = new CreateUserService();
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

});