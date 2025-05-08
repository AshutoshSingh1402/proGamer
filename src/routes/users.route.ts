import express from 'express';
import { UserController } from '../controllers/users.controller';
import { jwtAuthenticator } from '../middelwares/jwt-authenticater';

const userRouter = express.Router();
const userController: UserController= new UserController();

userRouter.get('/findById', userController.getById.bind(userController));
userRouter.get('/getWalletBalance', jwtAuthenticator, userController.getWalletBalance.bind(userController));
userRouter.get('/updateWalletBalance', jwtAuthenticator, userController.updateWalletBalance.bind(userController));

export default userRouter;
