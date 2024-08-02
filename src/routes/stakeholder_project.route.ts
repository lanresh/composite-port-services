import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { StakeholderProjectController } from '@/controllers/stakeholder_project.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { PrivilegeMiddleware } from '@/middlewares/privilege.middleware';

export class StakeholderProjectRoute implements Routes {
  public path = '/stakeholder-project';
  public router = Router();
  public StakeholderProjectController = new StakeholderProjectController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.StakeholderProjectController.findAllStakeholderProjects);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.StakeholderProjectController.findStakeholderProjectById);
    this.router.get(`${this.path}/project-code/:code`, AuthMiddleware, this.StakeholderProjectController.findStakeholderProjectByCode);
    this.router.get(`${this.path}/stakeholder-code/:code`, AuthMiddleware, this.StakeholderProjectController.findStakeholderProjectsByStakeholderCode);
    this.router.post(`${this.path}`, AuthMiddleware, PrivilegeMiddleware('can_create', 'stakeholder'), this.StakeholderProjectController.createStakeholderProject);
    this.router.put(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_edit', 'stakeholder'), this.StakeholderProjectController.updateStakeholderProject);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_delete', 'stakeholder'), this.StakeholderProjectController.deleteStakeholderProject);
  }
}
