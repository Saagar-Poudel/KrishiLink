//create login and register routes
import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';

const userRouter = Router();
// Register route
userRouter.post('/register', (req, res) => UserController.register(req, res));
// Login route
userRouter.post('/login', (req, res) => {
  UserController.login(req, res);
});

// Get user by username
userRouter.get('/by-username/:username', (req, res) => UserController.getUserByUsername(req, res));

// Export the user router
export default userRouter;