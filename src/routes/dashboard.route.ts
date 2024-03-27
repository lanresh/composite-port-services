import { DashboardController } from '@/controllers/dashboard.controller';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';

export class DashboardRoute implements Routes {
  public path = '/dashboard';
  public router = Router();
  public dashboard = new DashboardController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/entity-count`, AuthMiddleware, this.dashboard.entityCount);
    this.router.get(`${this.path}/pending-project`, AuthMiddleware, this.dashboard.getPendingProjects);
    this.router.get(`${this.path}/pending-request`, AuthMiddleware, this.dashboard.getPendingRequest);
    this.router.get(`${this.path}/staff-worker-count`, AuthMiddleware, this.dashboard.getStaffAndWorkerCountPerMonth);
  }
}
