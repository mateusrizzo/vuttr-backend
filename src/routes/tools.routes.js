import {Router} from 'express';

import ToolsController from '../controller/ToolsController.js';

const toolsRouter = Router();

const toolsController = new ToolsController();

toolsRouter.post('/', toolsController.store);
toolsRouter.get('/', toolsController.find);

export default toolsRouter;