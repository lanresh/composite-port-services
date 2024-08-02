import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ProjectFlatsController } from '@/controllers/project_flats.controller';
import { CreateProjectFlatsDto } from '@/dtos/project_flats.dto';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { PrivilegeMiddleware } from '@/middlewares/privilege.middleware';

export class ProjectFlatsRoute implements Routes {
  public path = '/project-flats';
  public router = Router();
  public project_flats = new ProjectFlatsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, PrivilegeMiddleware('can_create', 'project'), ValidationMiddleware(CreateProjectFlatsDto), this.project_flats.createProjectFlats);
    this.router.get(`${this.path}`, AuthMiddleware, this.project_flats.getProjectFlats);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.project_flats.getProjectFlat);
    this.router.get(`${this.path}/project-code/code`, AuthMiddleware, this.project_flats.getProjectFlatsByProjectCode);
    this.router.put(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_edit', 'project'), ValidationMiddleware(CreateProjectFlatsDto, true), this.project_flats.updateProjectFlats);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_delete', 'project'), this.project_flats.deleteProjectFlats);
  }
}
