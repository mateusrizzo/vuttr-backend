import mongoose from 'mongoose';
import CreateToolService from './CreateToolService.js';
import ListToolService from './ListToolsService.js';

let createTool;
let listTool;

describe('Tools', () => {
	let connection;

	beforeEach(() => {
		createTool = new CreateToolService();
		listTool = new ListToolService();
	})

	beforeAll(async () => {
		connection = await mongoose.connect('mongodb+srv://admin:OCvCYBbdUCwo39Gp@vuttr.gjxmq.mongodb.net/test?retryWrites=true&w=majority', {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
	});

	afterEach(async () => {
		await mongoose.connection.db.collection('tools').deleteMany({});
	})

	afterAll(async () => {
		await mongoose.connection.db.dropDatabase('test');
		await connection.close();
	});

	it('should be able to add a new tool to collection', async () => {
		const mockTool = {
			title: 'some_title', 
			link: 'somelink.com', 
			description: 'some very descriptive description', 
			tags: ['randomtag', 'test', 'mock', 'fake']
		}
		const tool = await createTool.execute(mockTool);
	
		expect(tool).toHaveProperty('_id');
	});
	it('should be able to list all tools', async () => {
		const mockTool1 = {
			title: 'some_title', 
			link: 'somelink.com', 
			description: 'some very descriptive description', 
			tags: ['randomtag', 'test', 'mock', 'fake']
		}
		const mockTool2 = {
			title: 'some_title', 
			link: 'somelink.com', 
			description: 'some very descriptive description', 
			tags: ['randomtag', 'test', 'mock', 'fake']
		}
		const mockTool3 = {
			title: 'some_title', 
			link: 'somelink.com', 
			description: 'some very descriptive description', 
			tags: ['randomtag', 'test', 'mock', 'fake']
		}
		await createTool.execute(mockTool1);
		await createTool.execute(mockTool2);
		await createTool.execute(mockTool3);

		const toolList = await listTool.execute();

		expect(toolList).toHaveLength(3);
	});
});