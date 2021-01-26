import {Router} from 'express';
import toolsRouter from './tools.routes.js';
import usersRouter from './users.routes.js';

const routes = Router();

routes.use('/tools', toolsRouter);
routes.use('/users', usersRouter);

export default routes;