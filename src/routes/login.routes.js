import {Router} from 'express';

import LoginController from '../controller/LoginController.js';

const loginRouter = Router();

const loginController = new LoginController();

loginRouter.post('/', loginController.create);

export default loginRouter;