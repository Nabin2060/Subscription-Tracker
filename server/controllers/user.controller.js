
import userModel from '../models/user.model.js';
// import { hashPassword, comparePassword } from '../utils/hash.js';
// import { generateToken } from '../utils/token.js';  


export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password');
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error: " + err.message });
    }
}

export const getUser = async (req, res) => {
    try {
        const userId = req.params.id;;
        const user = await userModel.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        };
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user,
        })
    } catch (err) {
        res.status(500).json({ message: "Server Error:" + err.message });
    }
}