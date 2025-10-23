import { Router } from "express";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();

subscriptionRouter.post('/subscription', authenticate, createSubscription);
subscriptionRouter.get('/subscription/:id', authenticate, getUserSubscriptions);

export default subscriptionRouter;