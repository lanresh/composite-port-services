import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';
import { ConsultantProjectController } from '@/controllers/consultant_project.controller';
import { PrivilegeMiddleware } from '@/middlewares/privilege.middleware';

export class ConsultantProjectRoute implements Routes {
  public path = '/consultant-projects';
  public router = Router();
  public consultantProject = new ConsultantProjectController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, PrivilegeMiddleware('can_create', 'consultant'), this.consultantProject.createConsultantProject);
    this.router.get(`${this.path}`, AuthMiddleware, PrivilegeMiddleware('can_view', 'consultant'), this.consultantProject.findAllConsultantProject);
    this.router.get(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_view', 'consultant'), this.consultantProject.findConsultantProjectById);
    this.router.get(`${this.path}/consultant/:id`, AuthMiddleware, PrivilegeMiddleware('can_view', 'consultant'), this.consultantProject.findAllConsultantProjectByConsultantId);
    this.router.get(`${this.path}/project/:code`, AuthMiddleware, PrivilegeMiddleware('can_view', 'consultant'), this.consultantProject.findAllConsultantProjectByProjectCode);
    this.router.put(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_edit', 'consultant'), this.consultantProject.updateConsultantProject);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_delete', 'consultant'), this.consultantProject.deleteConsultantProject);
  }
}
