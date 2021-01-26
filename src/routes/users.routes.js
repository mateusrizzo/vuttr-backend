import {Router} from 'express';

const usersRouter = Router();

usersRouter.post('/', usersController.store);

export default usersRouter;