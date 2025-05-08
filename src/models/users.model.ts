import { model, Schema, Document } from 'mongoose';
import { User } from '../interfaces/users.interface';

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  walletBalance: {
    type: Number,
  }
}, { timestamps: true });

const UserModel = model<User & Document>('User', userSchema);
export default UserModel;
