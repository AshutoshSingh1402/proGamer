import { Response, Request } from 'express';
import { User } from '../interfaces/users.interface';
import { UserService } from '../services/user/user.service';
import jwt from 'jsonwebtoken';

export class AuthController {
  public userService: UserService = new UserService();

  async signIn(req: Request, res: Response): Promise<void> {
    const { name, password } = req.body;
    const user: User = await this.userService.getByName(name);
    if (!user || user.password !== password) {
      res.status(200).json({
        data: {},
        message: 'Invalid username or password',
      });
      return;
    }
    res.status(200).json({
      data: { token: jwt.sign({ userId: user._id, name: user.name }, 'KJHGI7EY0OIPSOJLKJHIUEY98', { expiresIn: '1000000000' })},
      message: 'success',
    });
    return;
  }

  async signUp(req: Request, res: Response): Promise<void> {
    const userData: User = req.body;
    console.log(userData);
    try {
      const user: User = await this.userService.createUser(userData);
      res.status(200).json({ data: user, message: 'success' });
    } catch (err: any) {
      res.status(404).json({ data: {}, message: err.message, err });
    }
  }
}
