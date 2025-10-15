import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import config from './config/config.js';
import connectDB from './config/db.js';

const app = express();

const PORT = config.PORT;
connectDB();

app.use(express.json());

// app.use('/api/v1/auth',)

app.get('/', (req, res) => {
    res.send('api running');
})


app.listen(PORT, () => {
    console.log(`server is runnning on ${PORT}`);
})