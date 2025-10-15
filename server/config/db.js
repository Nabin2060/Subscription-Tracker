

import mongoose from "mongoose";
import config from "./config.js";


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.MONGO_URI, {
            useNewUrlParser: true,
        })
        console.log(`Database Connected : ${conn.connection.host}`);
    } catch (err) {
        console.error(`Database Connection Error: ${err.message}`);
    };

}

export default connectDB;
