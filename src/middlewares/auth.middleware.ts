import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import { EntityRepository, getConnection, getRepository } from 'typeorm';

const getAuthorization = req => {
  const coockie = req.cookies['Authorization'];
  if (coockie) return coockie;

  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
};

export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req);

    if (Authorization) {
      const { userid, id } = (await verify(Authorization, SECRET_KEY)) as DataStoredInToken;
      const findUser = await getConnection().query('SELECT id, userid, email, password FROM users_entity WHERE id = $1 AND userid = $2', [
        id,
        userid,
      ]);

      if (findUser) {
        req.user = findUser[0];
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    console.log(error);
    next(new HttpException(401, 'authentication error'));
  }
};
