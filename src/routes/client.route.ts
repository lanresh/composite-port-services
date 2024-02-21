import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { ClientController } from '@/controllers/client.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { CreateClientDto } from '@/dtos/client.dto';

export class ClientRoute implements Routes {
  public path = '/client';
  public router = Router();
  public clientController = new ClientController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`,AuthMiddleware,this.clientController.findAllClients);
    this.router.get(`${this.path}/:id`,AuthMiddleware, this.clientController.findClientById);
    this.router.post(`${this.path}`,AuthMiddleware,ValidationMiddleware(CreateClientDto), this.clientController.createClient);
    this.router.put(`${this.path}/:id`,AuthMiddleware, this.clientController.updateClient);
    this.router.delete(`${this.path}/:id`,AuthMiddleware, this.clientController.deleteClient);
}}
