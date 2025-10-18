import jwt from 'jsonwebtoken';
import config from "../config/config.js";


// Generate Token
export const generateToken = (payload) =>
    jwt.sign({
        data: payload,
    },
        config.JWT_SECRET,
        { expiresIn: config.JWT_EXPIRES_IN }
    );


// Verify Token

export const verifyToken = (token) => jwt.verify(token, config.JWT_SECRET);