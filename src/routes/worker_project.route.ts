import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { WorkerProjectController } from '@/controllers/worker_project.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { PrivilegeMiddleware } from '@/middlewares/privilege.middleware';

export class WorkerProjectRoute implements Routes {
  public path = '/worker-projects';
  public router = Router();
  public workerProject = new WorkerProjectController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.workerProject.findAllWorkerProjects);
    this.router.get(`${this.path}/project-code/:code`, AuthMiddleware, this.workerProject.findWorkerProjectByProjectCode);
    this.router.post(`${this.path}`, AuthMiddleware, PrivilegeMiddleware('can_create', 'project'), this.workerProject.createWorkerProject);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_delete', 'project'), this.workerProject.deleteWorkerProject);
  }
}
