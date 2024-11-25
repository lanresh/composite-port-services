import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ToolFromStoreController } from '@/controllers/tool_from_store.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class ToolFromStoreRoute implements Routes {
  public path = '/tool-from-store';
  public router = Router();
  public toolFromStoreController = new ToolFromStoreController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.toolFromStoreController.findAllToolFromStore);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.toolFromStoreController.findToolFromStoreById);
    this.router.post(`${this.path}`, AuthMiddleware, this.toolFromStoreController.createToolFromStore);
    this.router.put(`${this.path}/:id`, AuthMiddleware, this.toolFromStoreController.updateToolFromStore);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.toolFromStoreController.deleteToolFromStore);
  }
}
