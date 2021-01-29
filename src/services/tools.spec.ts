import mongoose from 'mongoose';
import CreateToolService from './CreateToolService';
import ListToolService from './ListToolsService';
import DeleteToolsService from './DeleteToolsService';
import CreateUserService from './CreateUserService';

let createTool: CreateToolService;
let listTool: ListToolService;
let deleteTool: DeleteToolsService;
let createUser: CreateUserService;

describe('Tools', () => {
	let connection;

	beforeEach(() => {
		createTool = new CreateToolService();
		listTool = new ListToolService();
		deleteTool = new DeleteToolsService();
		createUser = new CreateUserService();
	})

	beforeAll(async () => {
		connection = await mongoose.connect('mongodb+srv://admin:OCvCYBbdUCwo39Gp@vuttr.gjxmq.mongodb.net/test?retryWrites=true&w=majority', {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
	});

	afterEach(async () => {
		await mongoose.connection.db.collection('tools').deleteMany({});
		await mongoose.connection.db.collection('users').deleteMany({});
	})

	afterAll(async () => {
		await connection.close();
	});

	it('should be able to add a new tool to collection', async () => {
		const mockUser = {
			username: 'some_user',
			password: 'some_password'
		}

		const user = await createUser.execute(mockUser);

		const mockTool = {
			title: 'some_title', 
			link: 'somelink.com', 
			description: 'some very descriptive description', 
			tags: ['randomtag', 'test', 'mock', 'fake'],
			user_id: String(user._id)
		}
		const tool = await createTool.execute(mockTool);
	
		expect(tool).toHaveProperty('_id');
	});
	it('should be able to list all tools', async () => {
		const mockUser = {
			username: 'some_user',
			password: 'some_password'
		}

		const user = await createUser.execute(mockUser);

		const mockTool1 = {
			title: 'some_title', 
			link: 'somelink.com', 
			description: 'some very descriptive description', 
			tags: ['randomtag', 'test', 'mock', 'fake'],
			user_id: String(user._id)
		}
		const mockTool2 = {
			title: 'some_title', 
			link: 'somelink.com', 
			description: 'some very descriptive description', 
			tags: ['randomtag', 'test', 'mock', 'fake'],
			user_id: String(user._id)
		}
		const mockTool3 = {
			title: 'some_title', 
			link: 'somelink.com', 
			description: 'some very descriptive description', 
			tags: ['randomtag', 'test', 'mock', 'fake'],
			user_id: String(user._id)
		}
		await createTool.execute(mockTool1);
		await createTool.execute(mockTool2);
		await createTool.execute(mockTool3);

		const toolList = await listTool.execute(String(user._id));

		expect(toolList).toHaveLength(3);
	});
	it('should be able to search for specific tools based on a tag', async () => {
		const mockUser = {
			username: 'some_user',
			password: 'some_password'
		}

		const user = await createUser.execute(mockUser);

		const mockTool1 = {
			title: 'some_title', 
			link: 'somelink.com', 
			description: 'some very descriptive description', 
			tags: ['specifictag', 'test', 'mock', 'fake'],
			user_id: String(user._id)
		}
		const mockTool2 = {
			title: 'some_title', 
			link: 'somelink.com', 
			description: 'some very descriptive description', 
			tags: ['specifictag', 'test', 'mock', 'fake'],
			user_id: String(user._id)
		}
		const mockTool3 = {
			title: 'some_title', 
			link: 'somelink.com', 
			description: 'some very descriptive description', 
			tags: ['randomtag', 'test', 'mock', 'fake'],
			user_id: String(user._id)
		}
		await createTool.execute(mockTool1);
		await createTool.execute(mockTool2);
		await createTool.execute(mockTool3);

		const toolList = await listTool.execute(String(user._id), 'specifictag');

		expect(toolList).toHaveLength(2);
	})
	it('should not be able to find a tool with a unexistent tag', async () => {
		const mockUser = {
			username: 'some_user',
			password: 'some_password'
		}

		const user = await createUser.execute(mockUser);

		const mockTool1 = {
			title: 'some_title', 
			link: 'somelink.com', 
			description: 'some very descriptive description', 
			tags: ['randomtag', 'test', 'mock', 'fake'],
			user_id: String(user._id)
		}
		const mockTool2 = {
			title: 'some_title', 
			link: 'somelink.com', 
			description: 'some very descriptive description', 
			tags: ['randomtag', 'test', 'mock', 'fake'],
			user_id: String(user._id)
		}
		const mockTool3 = {
			title: 'some_title', 
			link: 'somelink.com', 
			description: 'some very descriptive description', 
			tags: ['randomtag', 'test', 'mock', 'fake'],
			user_id: String(user._id)
		}
		await createTool.execute(mockTool1);
		await createTool.execute(mockTool2);
		await createTool.execute(mockTool3);

		await expect(listTool.execute('inexistenttag')).rejects.toBeInstanceOf(Error);
	})
	it('Should be able to delete a tool', async () => {
		const mockUser = {
			username: 'some_user',
			password: 'some_password'
		}

		const user = await createUser.execute(mockUser);

		const mockTool1 = {
			title: 'some_title', 
			link: 'somelink.com', 
			description: 'some very descriptive description', 
			tags: ['randomtag', 'test', 'mock', 'fake'],
			user_id: String(user._id)
		}
		const mockTool2 = {
			title: 'some_title', 
			link: 'somelink.com', 
			description: 'some very descriptive description', 
			tags: ['randomtag', 'test', 'mock', 'fake'],
			user_id: String(user._id)
		}
		const mockTool3 = {
			title: 'some_title', 
			link: 'somelink.com', 
			description: 'some very descriptive description', 
			tags: ['randomtag', 'test', 'mock', 'fake'],
			user_id: String(user._id)
		}
		const toolForDeletion = await createTool.execute(mockTool1);
		await createTool.execute(mockTool2);
		await createTool.execute(mockTool3);

		await deleteTool.execute(toolForDeletion._id, String(user._id));

		const toolList = await listTool.execute(String(user._id));

		expect(toolList).toHaveLength(2);
	})
	it('should not be able to delete a tool with a invalid id', async () => {
		const mockUser = {
			username: 'some_user',
			password: 'some_password'
		}

		const user = await createUser.execute(mockUser);

		const mockTool1 = {
			title: 'some_title', 
			link: 'somelink.com', 
			description: 'some very descriptive description', 
			tags: ['randomtag', 'test', 'mock', 'fake'],
			user_id: String(user._id)
		}
		const mockTool2 = {
			title: 'some_title', 
			link: 'somelink.com', 
			description: 'some very descriptive description', 
			tags: ['randomtag', 'test', 'mock', 'fake'],
			user_id: String(user._id)
		}
		const mockTool3 = {
			title: 'some_title', 
			link: 'somelink.com', 
			description: 'some very descriptive description', 
			tags: ['randomtag', 'test', 'mock', 'fake'],
			user_id: String(user._id)
		}
		await createTool.execute(mockTool1);
		await createTool.execute(mockTool2);
		await createTool.execute(mockTool3);

		await expect(deleteTool.execute('999999999999999999999999', String(user._id))).rejects.toBeInstanceOf(Error);
	})
	it('should not be able to delete the tools from another user', async () => {
		const mockUser1 = {
			username: 'some_user1',
			password: 'some_password1'
		}
		const mockUser2 = {
			username: 'some_user2',
			password: 'some_password2'
		}

		const user1 = await createUser.execute(mockUser1);
		const user2 = await createUser.execute(mockUser2);

		const mockTool1 = {
			title: 'some_title', 
			link: 'somelink.com', 
			description: 'some very descriptive description', 
			tags: ['randomtag', 'test', 'mock', 'fake'],
			user_id: String(user1._id)
		}
		const mockTool2 = {
			title: 'some_title', 
			link: 'somelink.com', 
			description: 'some very descriptive description', 
			tags: ['randomtag', 'test', 'mock', 'fake'],
			user_id: String(user2._id)
		}
		const tool1 = await createTool.execute(mockTool1);
		const tool2 = await createTool.execute(mockTool2);

		await expect(deleteTool.execute(String(user1._id), String(tool2._id))).rejects.toBeInstanceOf(Error)
	})
});