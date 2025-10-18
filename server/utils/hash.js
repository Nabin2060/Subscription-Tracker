import bcrypt from 'bcryptjs';
import config from '../config/config.js';
import dotenv from 'dotenv';
dotenv.config();

export const hashPassword = async (password) => {
    try {
        const salt = Number(config.SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (err) {
        throw new Error("Password hashing failed:)" + err.message);
    }
}

// compare password
export const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (err) {
        throw new Error("Password comparison failed: " + err.message);
    }
}