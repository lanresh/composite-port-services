import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { upload } from '@/middlewares/multer.middleware';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, ValidationMiddleware(CreateUserDto), this.user.createUser);
    // this.router.get(`${this.path}`, this.user.getUsers);
    // this.router.get(`${this.path}/:id(\\d+)`, this.user.getUserById);
    this.router.put(`${this.path}/password`, this.user.updateUserPassword);
    this.router.put(`${this.path}/change-password`, AuthMiddleware, this.user.changePassword);
    this.router.post(`${this.path}/upload-file`, AuthMiddleware, upload.single('image'), this.user.uploadFile);
    // this.router.delete(`${this.path}/:id(\\d+)`, this.user.deleteUser);
  }
}
