
import userModel from "../models/user.model.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken, verifyToken } from "../utils/token.js";

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please signin"
            });
        };
        // hash password
        const hashedPassword = await hashPassword(password);

        // create new user
        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword
        })
        await newUser.save();
        // generate token
        const token = generateToken({ id: newUser._id, email: newUser.email });

        // return response
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                user: newUser,
                token: token
            }
        });

    } catch (err) {
        res.status(500).json({ message: "Server Error:" + err.message });
    }
}

