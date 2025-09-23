//create login and register routes
import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const userRouter = Router();
// Register route
userRouter.post("/register", (req, res) => UserController.register(req, res));
// Login route
userRouter.post("/login", (req, res) => {
  UserController.login(req, res);
});

// Get user by username
userRouter.get('/by-username/:username', (req, res) => UserController.getUserByUsername(req, res));

userRouter.put("/profile/:id", UserController.updateProfile)

userRouter.put("/change-password/:id", UserController.changePassword);

// Export the user router
export default userRouter;