import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { DataStoredInToken } from '@/interfaces/auth.interface';
import { getConnection } from 'typeorm';

const getAuthorization = req => {
  const coockie = req.cookies['Authorization'];
  if (coockie) return coockie;

  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
};

export const PrivilegeMiddleware = (action: string, type: string) => async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req);
    if (Authorization) {
      const { userid } = (await verify(Authorization, SECRET_KEY)) as DataStoredInToken;
      const getStaffRole = await getConnection().query(`SELECT user_type FROM users_entity WHERE userid = $1`, [userid]);

      const getStaffPrivilege = await getConnection().query(`SELECT ${action} FROM staff_privilege_entity WHERE staff_id = $1 AND type = $2`, [
        userid,
        type,
      ]);

      if (getStaffRole[0].user_type.toLowerCase() === 'admin' || (getStaffPrivilege.length && getStaffPrivilege[0][action] === 1)) {
        next();
      } else {
        next(new HttpException(403, 'You do not have permission to carry out this function'));
      }
    } else {
      next(new HttpException(404, 'Invalid Access'));
    }
  } catch (error) {
    next(new HttpException(401, 'authentication error'));
  }
};
