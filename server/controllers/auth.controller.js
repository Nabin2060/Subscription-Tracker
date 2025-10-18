
import userModel from "../models/user.model.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/token.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
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
            name,
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

export const signin = async (req, res) => {
    try {

        const { email, password } = req.body;
        // check if user exists
        const user = await userModel.findOne({ email: email.toLowerCase() }).select('+password');
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist. Please signup"
            })
        };
        // compare password
        const isValiPassword = await comparePassword(password, user.password);
        if (!isValiPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        };
        // generate token
        const token = generateToken({ id: user._id, email: user.email });
        // return response
        res.status(201).json({
            success: true,
            message: "User logged in successfully",
            data: {
                user: user,
                token: token,
            }
        })


    } catch (err) {
        res.status(500).json({ message: "Server Error:" + err.message });
    }
}
