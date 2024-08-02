import { Routes } from '@/interfaces/routes.interface';
import { ProjectCommentController } from '@/controllers/project_comment.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';
import { PrivilegeMiddleware } from '@/middlewares/privilege.middleware';

export class ProjectCommentRoute implements Routes {
  public path = '/project-comments';
  public router = Router();
  public projectComment = new ProjectCommentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, PrivilegeMiddleware('can_create', 'project'), this.projectComment.createProjectComment);
    this.router.get(`${this.path}`, AuthMiddleware, this.projectComment.findAllProjectComment);
    this.router.get(`${this.path}/project/:id`, AuthMiddleware, this.projectComment.findProjectCommentByProjectCode);
    this.router.get(`${this.path}/client/:id`, AuthMiddleware, this.projectComment.findProjectCommentByClientId);
  }
}
