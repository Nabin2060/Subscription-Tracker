import subscriptionModel from "../models/subscription.model.js";


export const createSubscription = async (req, res) => {
    try {
        const subscription = await subscriptionModel.create({
            ...req.body,
            user: req.user._id,
        });
        res.status(201).json({
            success: true,
            message: "Subscription created successfully",
            data: subscription,
        })
    } catch (err) {
        res.status(500).json({ message: "Server Error:" + err.message });
    }
}