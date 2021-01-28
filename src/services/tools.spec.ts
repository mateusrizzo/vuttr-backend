import mongoose from 'mongoose';
import CreateToolService from './CreateToolService';
import ListToolService from './ListToolsService';
import DeleteToolsService from './DeleteToolsService';

let createTool;
let listTool;
let deleteTool;

describe('Tools', () => {
	let connection;

	beforeEach(() => {
		createTool = new CreateToolService();
		listTool = new ListToolService();
		deleteTool = new DeleteToolsService();
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
	it('should be able to search for specific tools based on a tag', async () => {
		const mockTool1 = {
			title: 'some_title', 
			link: 'somelink.com', 
			description: 'some very descriptive description', 
			tags: ['specifictag', 'test', 'mock', 'fake']
		}
		const mockTool2 = {
			title: 'some_title', 
			link: 'somelink.com', 
			description: 'some very descriptive description', 
			tags: ['specifictag', 'test', 'mock', 'fake']
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

		const toolList = await listTool.execute('specifictag');

		expect(toolList).toHaveLength(2);
	})
	it('should not be able to find a tool with a unexistent tag', async () => {
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

		await expect(listTool.execute('inexistenttag')).rejects.toBeInstanceOf(Error);
	})
	it('Should be able to delete a tool', async () => {
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
		const toolForDeletion = await createTool.execute(mockTool1);
		await createTool.execute(mockTool2);
		await createTool.execute(mockTool3);

		await deleteTool.execute(toolForDeletion._id);

		const toolList = await listTool.execute();

		expect(toolList).toHaveLength(2);
	})
	it('should not be able to delete a tool without a id', async () => {
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

		await expect(deleteTool.execute()).rejects.toBeInstanceOf(Error);
	})
	it('should not be able to delete a tool with a invalid id', async () => {
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

		await expect(deleteTool.execute('601063e45d31f57d07c1b555')).rejects.toBeInstanceOf(Error);
	})
});