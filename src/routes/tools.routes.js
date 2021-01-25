import {Router} from 'express';

const toolsRouter = Router();

toolsRouter.post('/', toolsController.store);

export default toolsRouter;