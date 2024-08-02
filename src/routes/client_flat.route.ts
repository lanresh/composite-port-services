import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ClientFlatController } from '@/controllers/client_flat.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { PrivilegeMiddleware } from '@/middlewares/privilege.middleware';

export class ClientFlatRoute implements Routes {
  public path = '/client-flat';
  public router = Router();
  public clientFlatController = new ClientFlatController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.clientFlatController.findAllClientFlats);
    this.router.get(`${this.path}/client/:id`, AuthMiddleware, this.clientFlatController.findClientFlatsByClientId);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.clientFlatController.findClientFlatsById);
    this.router.post(`${this.path}`, AuthMiddleware, PrivilegeMiddleware('can_create', 'client'), this.clientFlatController.createClientFlat);
    this.router.put(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_edit', 'client'), this.clientFlatController.updateClientFlat);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_delete', 'client'), this.clientFlatController.deleteClientFlat);
  }
}
