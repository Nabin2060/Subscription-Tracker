import { Router } from "express";
import { getAllUsers, getUser } from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.get('/allUsers', getAllUsers);
userRouter.get('/allUsers/:id', getUser);


export default userRouter;