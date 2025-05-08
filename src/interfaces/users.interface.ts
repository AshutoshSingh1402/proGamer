export interface User {
  _id: string;
  name: string;
  password?: string;
  walletBalance: number;
  roles: string[];
}
