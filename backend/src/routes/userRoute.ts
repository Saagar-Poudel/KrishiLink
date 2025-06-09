//create login and register routes
import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/userController';

const userRouter = Router();
// Register route
userRouter.post('/register', (req:Request, res: Response) => UserController.register(req, res));
// Login route
userRouter.post('/login', (req: Request, res: Response) => {
  UserController.login(req, res);
});
// Export the user router
export default userRouter;