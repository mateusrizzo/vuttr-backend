import {Router} from 'express';
import toolsRouter from './tools.routes.js';
import usersRouter from './users.routes.js';
import loginRouter from './login.routes.js';

const routes = Router();

routes.use('/tools', toolsRouter);
routes.use('/users', usersRouter);
routes.use('/login', loginRouter);

export default routes;