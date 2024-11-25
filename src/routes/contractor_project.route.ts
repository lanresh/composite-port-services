import { createContractorProjectDto } from '@/dtos/contractor_project.dto';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';
import { ContractorProjectController } from '@/controllers/contractor_project.controller';
import { PrivilegeMiddleware } from '@/middlewares/privilege.middleware';

export class ContractorProjectRoute implements Routes {
  public path = '/contractor-projects';
  public router = Router();
  public contractorProject = new ContractorProjectController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      AuthMiddleware,
      PrivilegeMiddleware('can_create', 'project'),
      ValidationMiddleware(createContractorProjectDto),
      this.contractorProject.createContractorProject,
    );
    this.router.get(`${this.path}`, AuthMiddleware, this.contractorProject.findAllContractorProject);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.contractorProject.getContractorProject);
    this.router.get(`${this.path}/project-code/:code`, AuthMiddleware, this.contractorProject.getContractorProjectsByProjectCode);
    this.router.get(`${this.path}/contractor-code/:code`, AuthMiddleware, this.contractorProject.getContractorProjectsByContractorCode);
    this.router.put(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_edit', 'project'), this.contractorProject.updateContractorProject);
    this.router.delete(
      `${this.path}/:id`,
      AuthMiddleware,
      PrivilegeMiddleware('can_delete', 'project'),
      this.contractorProject.deleteContractorProject,
    );
  }
}
