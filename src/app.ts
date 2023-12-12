import express from 'express';
import dotenv from 'dotenv';
import { usersRouter } from './routes/usersRoutes';
import { walletRouter } from './routes/walletRoutes';
import cookieParser from 'cookie-parser';
import { transRouter } from './routes/transRoutes';

dotenv.config();
const app = express()
const PORT = process.env.APP_PORT;

app.use(cookieParser())
app.use(express.json());
app.use('/users', usersRouter);
app.use('/wallet', walletRouter);
app.use('/transactions', transRouter);
app.listen(PORT, () => console.log('App ready and listining on ' + PORT));