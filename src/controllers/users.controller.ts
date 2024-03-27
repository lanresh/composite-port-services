import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { User } from '@interfaces/users.interface';
import { UserService } from '@services/users.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class UserController {
  public user = new UserService();

  //   public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //     try {
  //       const findAllUsersData: User[] = await this.user.findAllUser();

  //       res.status(200).json({ data: findAllUsersData, message: 'findAll' });
  //     } catch (error) {
  //       next(error);
  //     }
  //   };

  //   public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //     try {
  //       const userId = Number(req.params.id);
  //       const findOneUserData: User = await this.user.findUserById(userId);

  //       res.status(200).json({ data: findOneUserData, message: 'findOne' });
  //     } catch (error) {
  //       next(error);
  //     }
  //   };

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body;
      const createUserData: User = await this.user.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'user created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUserPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body;
      const updateUserData: User = await this.user.updateUser(userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public changePassword = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user.userid;
      const userData = req.body;
      const updateUserData: User = await this.user.changePassword(userId, userData.oldPassword, userData.newPassword);

      res.status(200).json({ data: updateUserData, message: 'Password Changed Successfully' });
    } catch (error) {
      next(error);
    }
  };

  //   public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //     try {
  //       const userId = Number(req.params.id);
  //       const deleteUserData: User = await this.user.deleteUser(userId);

  //       res.status(200).json({ data: deleteUserData, message: 'deleted' });
  //     } catch (error) {
  //       next(error);
  //     }
  //   };
}
