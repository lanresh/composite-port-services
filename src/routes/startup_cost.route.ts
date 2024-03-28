import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { StartupCostController } from '@controllers/startup_cost.controller';
import { CreateStartupCostDto } from '@dtos/startup_cost.dto';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class StartupCostRoute implements Routes {
  public path = '/startup-costs';
  public router = Router();
  public startup_cost = new StartupCostController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateStartupCostDto), this.startup_cost.createStartUpCost);
    this.router.get(`${this.path}`, AuthMiddleware, this.startup_cost.getStartUpCosts);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.startup_cost.getStartUpCost);
    this.router.get(`${this.path}/project-code/code`, AuthMiddleware, this.startup_cost.getStartUpCostByCode);
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(CreateStartupCostDto, true), this.startup_cost.updateStartUpCost);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.startup_cost.deleteStartUpCost);
  }
}
