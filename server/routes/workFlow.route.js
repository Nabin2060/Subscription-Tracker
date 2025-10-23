import { Router } from "express";
import { sendReminders } from "../controllers/workFlow.controller.js";

const workFlowRouter = Router();

workFlowRouter.post('/subscription/reminder', sendReminders);

export default workFlowRouter;