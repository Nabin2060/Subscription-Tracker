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




};

export default config;