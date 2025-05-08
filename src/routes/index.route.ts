import express from 'express';
import { Router } from 'express';
import userRouter from './users.route';
import authRouter from './auth.route';

const router: Router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);

export default router;
