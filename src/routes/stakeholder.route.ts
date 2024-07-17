import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { StakeholderController } from '@/controllers/stakeholder.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { PrivilegeMiddleware } from '@/middlewares/privilege.middleware';



export class StakeholderRoute implements Routes {
  public path = '/stakeholder';
  public router = Router();
  public StakeholderController = new StakeholderController();

  

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, PrivilegeMiddleware('can_view', 'stakeholder'), this.StakeholderController.findAllStakeholders);
    this.router.get(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_view', 'stakeholder'), this.StakeholderController.findStakeholderById);
    this.router.post(`${this.path}`, AuthMiddleware, PrivilegeMiddleware('can_create', 'stakeholder'), this.StakeholderController.createStakeholder);
    this.router.put(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_edit', 'stakeholder'), this.StakeholderController.updateStakeholder);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_delete', 'stakeholder'), this.StakeholderController.deleteStakeholder);  
}}
