import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { StakeholderController } from '@/controllers/stakeholder.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';



export class StakeholderRoute implements Routes {
  public path = '/stakeholder';
  public router = Router();
  public StakeholderController = new StakeholderController();

  

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.StakeholderController.findAllStakeholders);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.StakeholderController.findStakeholderById);
    this.router.post(`${this.path}`, AuthMiddleware, this.StakeholderController.createStakeholder);
    this.router.put(`${this.path}/:id`, AuthMiddleware, this.StakeholderController.updateStakeholder);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.StakeholderController.deleteStakeholder);  
}}
