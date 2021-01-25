import {Router} from 'express';

import ToolsController from '../controller/ToolsController.js';

const toolsRouter = Router();

const toolsController = new ToolsController();

toolsRouter.post('/', toolsController.store);

export default toolsRouter;