import { Router } from "express";
import { getAllUsers, getUser } from "../controllers/user.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

export const userRouter = Router();

userRouter.get('/allUsers', authenticate, authorize('admin'), getAllUsers);
userRouter.get('/allUsers/:id', authenticate, getUser);


export default userRouter;