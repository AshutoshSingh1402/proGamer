import express from 'express';
import { AuthController } from '../controllers/auth.controller';

const authRouter = express.Router();
const authController: AuthController= new AuthController();

authRouter.get('/signIn', authController.signIn.bind(authController));
authRouter.post('/signUp', authController.signUp.bind(authController));

export default authRouter;
