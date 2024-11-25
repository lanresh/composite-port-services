import { InventoryController } from '@/controllers/inventory.controller';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { PrivilegeMiddleware } from '@/middlewares/privilege.middleware';
import { Router } from 'express';

export class InventoryRoute implements Routes {
  public path = '/inventory';
  public router = Router();
  public inventory = new InventoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, PrivilegeMiddleware('can_create', 'inventory'), this.inventory.createInventory);
    this.router.get(`${this.path}`, AuthMiddleware, this.inventory.findAllInventory);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.inventory.findInventoryById);
    this.router.put(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_edit', 'inventory'), this.inventory.updateInventory);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_delete', 'inventory'), this.inventory.deleteInventory);
    this.router.get(`${this.path}/types/all`, AuthMiddleware, this.inventory.getAllInventoryTypes);
    this.router.get(`${this.path}/type/all`, AuthMiddleware, this.inventory.getInventoryByType);
  }
}
