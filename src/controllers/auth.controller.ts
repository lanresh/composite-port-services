import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';

export class AuthController {
  public auth = new AuthService();

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body;
      const { token, findUser } = await this.auth.login(userData.email, userData.password);

      res.status(200).json({ data: findUser, token: token, message: 'login successful' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId: string = req.user.userid;
      const logOutUserData: string = await this.auth.logout(userId);

      //   res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };

  public forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body;
      const resetPasswordData: string = await this.auth.forgotPassword(userData.email, userData.link);

      res.status(200).json({ data: resetPasswordData, message: 'password reset link sent' });
    } catch (error) {
      next(error);
    }
  };
}
