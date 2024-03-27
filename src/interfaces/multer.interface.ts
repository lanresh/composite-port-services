import { Request } from 'express';
import { User } from './users.interface';

export interface MulterRequest extends Request {
  file: any;
  user: User;
  files: any;
}