import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connect } from '../dbConfig/dbConfig';

import loginRouter from './users/login';
import signupRouter from './users/signup';
import logoutRouter from './users/logout';
import verifyEmailRouter from './users/verifyemail';
import resetPasswordRouter from './users/reset-password';
import productsRouter from './users/products';
import homepageRouter from './users/homepage';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connect();

app.use('/api/users/login', loginRouter);
app.use('/api/users/signup', signupRouter);
app.use('/api/users/logout', logoutRouter);
app.use('/api/users/verifyemail', verifyEmailRouter);
app.use('/api/users/reset-password', resetPasswordRouter);
app.use('/api/users/products', productsRouter);
app.use('/api/users/homepage', homepageRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
}); 