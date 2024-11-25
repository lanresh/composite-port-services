import { Routes } from '@/interfaces/routes.interface';
import { ProjectTeamController } from '@/controllers/project_team.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';
import { PrivilegeMiddleware } from '@/middlewares/privilege.middleware';

export class ProjectTeamRoute implements Routes {
  public path = '/project-teams';
  public router = Router();
  public projectTeam = new ProjectTeamController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, PrivilegeMiddleware('can_create', 'project'), this.projectTeam.createProjectTeam);
    this.router.get(`${this.path}`, AuthMiddleware, this.projectTeam.getAllProjectTeam);
    this.router.get(`${this.path}/:code`, AuthMiddleware, this.projectTeam.getProjectTeamByProjectCode);
    this.router.delete(
      `${this.path}/:code/:staffId`,
      AuthMiddleware,
      PrivilegeMiddleware('can_delete', 'project'),
      this.projectTeam.deleteProjectTeamMember,
    );
  }
}
