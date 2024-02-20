import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { ClientController } from '@/controllers/client.controller';

export class ClientRoute implements Routes {
  public path = '/client';
  public router = Router();
  public clientController = new ClientController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.clientController.findAllClients);
    this.router.get(`${this.path}/:id`, this.clientController.findClientById);
    this.router.post(`${this.path}`, this.clientController.createClient);
    this.router.put(`${this.path}/:id`, this.clientController.updateClient);
    this.router.delete(`${this.path}/:id`, this.clientController.deleteClient);
}}
