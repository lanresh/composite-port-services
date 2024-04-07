import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';
import { ConsultantProjectController } from '@/controllers/consultant_project.controller';

export class ConsultantProjectRoute implements Routes {
  public path = '/consultant-projects';
  public router = Router();
  public consultantProject = new ConsultantProjectController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, this.consultantProject.createConsultantProject);
    this.router.get(`${this.path}`, AuthMiddleware, this.consultantProject.findAllConsultantProject);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.consultantProject.findConsultantProjectById);
    this.router.get(`${this.path}/client/:clientId`, AuthMiddleware, this.consultantProject.findAllConsultantProjectByClientId);
    this.router.get(`${this.path}/project/:projectId`, AuthMiddleware, this.consultantProject.findAllConsultantProjectByProjectId);
    this.router.put(`${this.path}/:id`, AuthMiddleware, this.consultantProject.updateConsultantProject);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.consultantProject.deleteConsultantProject);
  }
}
