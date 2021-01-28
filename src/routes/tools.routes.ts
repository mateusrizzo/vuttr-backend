import {Router} from 'express';

import checkAuthentication from '../middlewares/checkAuthentication.js';

import ToolsController from '../controller/ToolsController.js';

const toolsRouter = Router();

const toolsController = new ToolsController();

toolsRouter.post('/', checkAuthentication, toolsController.store);
toolsRouter.get('/', checkAuthentication, toolsController.find);
toolsRouter.delete('/:id', checkAuthentication, toolsController.delete);

export default toolsRouter;