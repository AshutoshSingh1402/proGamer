import { User } from '../interfaces/users.interface';
import UserModel from '../models/users.model';

export class UserRepository {
  private readonly userModel = UserModel;

  async getUserById(id: string): Promise<User> {
    return  this.userModel.findById(id) as unknown as User;
  }

  async createUser(userData: User): Promise<User> {
    return this.userModel.create(userData);
  }

  async getUserByName(name: string): Promise<User> {
    return this.userModel.findOne({ name: name }) as unknown as User;
  }

  async update(userId: string, userDetails: Partial<User>): Promise<User> {
    return this.userModel.findByIdAndUpdate(userId, userDetails) as unknown as User;
  }
}
