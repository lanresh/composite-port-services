import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ClientProjectController } from '@/controllers/client_project.controller';

export class ClientProjectRoute implements Routes {
  public path = '/client_project';
  public router = Router();
  public clientProjectController = new ClientProjectController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.clientProjectController.findAllClientProjects);
    this.router.get(`${this.path}/client/:id`, this.clientProjectController.findClientProjectsByClientId);
    this.router.get(`${this.path}/project/:id`, this.clientProjectController.findClientProjectsByProjectId);
    this.router.get(`${this.path}/:id`, this.clientProjectController.findClientProjectsById);
    this.router.post(`${this.path}`, this.clientProjectController.createClientProject);
    this.router.put(`${this.path}/:id`, this.clientProjectController.updateClientProject);
    this.router.delete(`${this.path}/:id`, this.clientProjectController.deleteClientProject);
  }
}
