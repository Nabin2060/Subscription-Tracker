import { Router } from "express";
import { createSubscription } from "../controllers/subscription.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();

// subscriptionRouter.get('/', )
subscriptionRouter.post('/subscription', authenticate, createSubscription);

export default subscriptionRouter;