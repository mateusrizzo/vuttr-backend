import {Router} from 'express';

import UsersController from '../controller/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post('/', usersController.store);

export default usersRouter;