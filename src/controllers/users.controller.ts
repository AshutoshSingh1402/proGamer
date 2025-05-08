import { Response, Request } from 'express';
import { User } from '../interfaces/users.interface';
import { UserService } from '../services/user/user.service';

export class UserController {
  public userService: UserService = new UserService();

  async getById(req: Request, res: Response): Promise<void> {
    const { userId } = req.body;
    const user: User = await this.userService.getById(userId);
    res.status(200).json({ data: user, message: 'success' });
  }

  async getWalletBalance(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.body.userId
      const userWalletBalance = await this.userService.getWalletBalance(userId);
      res.status(200).json({ data: userWalletBalance, message: 'success' });
    } catch (error: any) {
      res.status(400).json({ data: {}, message: error.message });
    }
  }

  async updateWalletBalance(req: Request, res: Response): Promise<void> {
    if (!this.userService.isAdminUser(req.user as unknown as User)) {
      res.status(400).json({ data: {}, message: 'No Access Found', error: 'No Access Found' });
    }
    try {
      const { userId, action, amount } = req.body;
      await this.userService.updateWalletBalance(userId, action, amount);
    } catch (err) {
      const error = err as unknown as Error;
      res.status(400).json({ data: {}, message: error.message });
    }
  }
}
