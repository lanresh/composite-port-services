import { Request } from 'express';
import { User } from '@interfaces/users.interface';

export interface DataStoredInToken {
  userid: string;
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
