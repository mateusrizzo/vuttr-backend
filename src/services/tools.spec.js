import {MongoClient} from 'mongoose';
import CreateToolService from './CreateToolService.js';

describe('Tools', () => {
	let connection;
	let db;

	beforeEach(() => {
		let createUser = new CreateUserService();
	})

	beforeAll(async () => {
		connection = await MongoClient.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		db = await connection.db();
	});

	afterAll(async () => {
		await connection.close();
	});
});

it('should be able to add a new tool to collection', async () => {
	const mockTool = {
		title: 'some_title', 
		link: 'somelink.com', 
		description: 'some very descriptive description', 
		tags: ['randomtag', 'test', 'mock', 'fake']
	}
	const tool = await createUser.execute(mockTool);

	expect(tool).toHaveProperty('_id');
})