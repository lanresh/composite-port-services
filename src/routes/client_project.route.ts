import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ClientProjectController } from '@/controllers/client_project.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { PrivilegeMiddleware } from '@/middlewares/privilege.middleware';

export class ClientProjectRoute implements Routes {
  public path = '/client_project';
  public router = Router();
  public clientProjectController = new ClientProjectController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.clientProjectController.findAllClientProjects);
    this.router.get(`${this.path}/client/:id`, AuthMiddleware, this.clientProjectController.findClientProjectsByClientId);
    this.router.get(`${this.path}/project/:id`, AuthMiddleware, this.clientProjectController.findClientProjectsByProjectId);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.clientProjectController.findClientProjectsById);
    this.router.post(`${this.path}`, AuthMiddleware, PrivilegeMiddleware('can_create', 'client'), this.clientProjectController.createClientProject);
    this.router.put(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_edit', 'client'), this.clientProjectController.updateClientProject);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_delete', 'client'), this.clientProjectController.deleteClientProject);
  }
}
