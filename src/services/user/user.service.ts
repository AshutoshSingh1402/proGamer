import { User } from '../../interfaces/users.interface';
import { UserRepository } from '../../repository/user.repository';

export class UserService {
  private readonly repository: UserRepository = new UserRepository();

  async getById(id: string): Promise<User> {
    return this.repository.getUserById(id);
  }

  async getByName(name: string): Promise<User> {
    return this.repository.getUserByName(name);
  }

  async createUser(userData: User): Promise<User> {
    if (!userData.password || !userData.name) {
      throw new Error('Data missing');
    }
    return this.repository.createUser(userData);
  }

  async getWalletBalance(userId: string): Promise<number> {
    const user = await this.repository.getUserById(userId);
    return user.walletBalance
  }


  isAdminUser(user: User | undefined): boolean {
    if (!user) {
      return false;
    }
    return user.roles.includes('admin');
  }

  async updateWalletBalance(userId: string, action: 'CREDIT' | 'DEBIT', amount: number): Promise<void> {
    if (!userId || !['CREDIT', 'DEBIT'].includes(action) || !amount) {
      throw new Error('Data missing');
    }
    const user = await this.repository.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    let updatedWalletBalance;
    if (action === 'CREDIT') {
      updatedWalletBalance = (user.walletBalance || 0) + Number(amount);
    } else {
      updatedWalletBalance = (user.walletBalance || 0) - Number(amount);
    }
    const updatedUser = await this.repository.update(userId, { walletBalance: updatedWalletBalance });
    console.log(updatedUser);
  }
}
