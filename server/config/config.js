/* eslint-env node */
/* global process */
import dotenv from 'dotenv';

dotenv.config();

const config = {
    // NODE_ENV: process.env.NODE_ENV || 'development',
    // PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
    // MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/dev-db',
    NODE_ENV: process.env.NODE_ENV || 'development',
    SERVER: process.env.SERVER_URL,
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    ARCJET_API_KEY: process.env.ARCJET_API_KEY,
    UPSTASH_QSTASH_URL: process.env.QSTASH_URL,
    UPSTASH_QSTASH_AUTH_TOKEN: process.env.QSTASH_TOKEN,

    // Email Config
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,




};

export default config;