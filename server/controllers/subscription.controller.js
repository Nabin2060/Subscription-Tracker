import config from "../config/config.js";
import { workFlowClient } from "../config/upstash.js";
import subscriptionModel from "../models/subscription.model.js";



export const createSubscription = async (req, res) => {
    try {
        const subscription = await subscriptionModel.create({
            ...req.body,
            user: req.user._id,
        });

        const { workflowRunId } = await workFlowClient.trigger({
            url: `${config.SERVER}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription._id,
            },
            headers: {
                'Content-Type': 'application/json',
            },
            retries: 0,
        });
        res.status(201).json({
            success: true,
            message: "Subscription created successfully",
            data: {
                subscription,
                workflowRunId,
            }
        })
    } catch (err) {
        res.status(500).json({ message: "Server Error:" + err.message });
    }
};

export const getUserSubscriptions = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.user._id.toString() !== id.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access",
            })
        }
        const subscriptions = await subscriptionModel.find({ user: id });
        res.status(200).json({
            success: true,
            message: "User subscriptions fetched successfully",
            data: subscriptions,
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error:" + err.message });
    }
}