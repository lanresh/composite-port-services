import { ProjectController } from '@/controllers/project.controller';
import { CreateProjectDto } from '@/dtos/project.dto';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class ProjectRoute implements Routes {
  public path = '/projects';
  public router = Router();
  public project = new ProjectController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateProjectDto), this.project.createProject);
    this.router.get(`${this.path}`, AuthMiddleware, this.project.getAllProject);
    this.router.get(`${this.path}/:id(\\d+)`, AuthMiddleware, this.project.getProject);
    this.router.put(`${this.path}/:id(\\d+)`, AuthMiddleware, this.project.updateProject);
    this.router.delete(`${this.path}/:id(\\d+)`, AuthMiddleware, this.project.deleteProject);
    this.router.get(`${this.path}/summary/:code`, AuthMiddleware, this.project.getProjectSummary);
  }
}
