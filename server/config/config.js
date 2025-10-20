/* eslint-env node */
/* global process */
import dotenv from 'dotenv';

dotenv.config();

const config = {
    // NODE_ENV: process.env.NODE_ENV || 'development',
    // PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
    // MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/dev-db',
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    ARCJET_API_KEY: process.env.ARCJET_API_KEY,




};

export default config;