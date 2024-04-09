import { Routes } from '@/interfaces/routes.interface';
import { ProjectTeamController } from '@/controllers/project_team.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';

export class ProjectTeamRoute implements Routes {
  public path = '/project-teams';
  public router = Router();
  public projectTeam = new ProjectTeamController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, this.projectTeam.createProjectTeam);
    this.router.get(`${this.path}`, AuthMiddleware, this.projectTeam.getAllProjectTeam);
    this.router.get(`${this.path}/:projectCode`, AuthMiddleware, this.projectTeam.getProjectTeamByProjectCode);
  }
}
