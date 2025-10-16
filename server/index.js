import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import config from './config/config.js';
import connectDB from './config/db.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

const PORT = config.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
// app.use('/api/v1/auth',)
//app.use('/api/v1/users',)
//app.use('/api/v1/subscriptions',)

// error middleware
app.use(errorMiddleware);

// test route
app.get('/', (req, res) => {
    res.send('api running');
})
// connect to database
connectDB();

// start the server
app.listen(PORT, () => {
    console.log(`server is runnning on ${PORT}`);
})