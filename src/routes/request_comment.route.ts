import { RequestCommentController } from '@/controllers/request_comment.controller';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';

export class RequestCommentRoute implements Routes {
  public path = '/request-comments';
  public router = Router();
  public requestComment = new RequestCommentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.requestComment.getAllRequestComments);
    this.router.get(`${this.path}/:code`, this.requestComment.getRequestCommentsByRequestCode);
    this.router.post(`${this.path}`, AuthMiddleware, this.requestComment.createRequestComment);
    this.router.put(`${this.path}/:id`, AuthMiddleware, this.requestComment.updateRequestComment);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.requestComment.deleteRequestComment);
  }
}
