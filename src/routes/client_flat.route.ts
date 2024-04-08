import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ClientFlatController } from '@/controllers/client_flat.controller';

export class ClientFlatRoute implements Routes {
  public path = '/client-flat';
  public router = Router();
  public clientFlatController = new ClientFlatController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.clientFlatController.findAllClientFlats);
    this.router.get(`${this.path}/client/:id`, this.clientFlatController.findClientFlatsByClientId);
    this.router.get(`${this.path}/:id`, this.clientFlatController.findClientFlatsById);
    this.router.post(`${this.path}`, this.clientFlatController.createClientFlat);
    this.router.put(`${this.path}/:id`, this.clientFlatController.updateClientFlat);
    this.router.delete(`${this.path}/:id`, this.clientFlatController.deleteClientFlat);
  }
}
