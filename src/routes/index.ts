import {Router} from 'express';
import toolsRouter from './tools.routes';
import usersRouter from './users.routes';
import loginRouter from './login.routes';

const routes = Router();

routes.use('/tools', toolsRouter);
routes.use('/users', usersRouter);
routes.use('/login', loginRouter);

export default routes;