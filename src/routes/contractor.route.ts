import { CreateContractorDto } from '@/dtos/contractor.dto';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';
import { ContractorController } from '@/controllers/contractor.controller';
import { PrivilegeMiddleware } from '@/middlewares/privilege.middleware';

export class ContractorRoute implements Routes {
  public path = '/contractors';
  public router = Router();
  public contractor = new ContractorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      AuthMiddleware,
      PrivilegeMiddleware('can_create', 'contractor'),
      ValidationMiddleware(CreateContractorDto),
      this.contractor.createContractor,
    );
    this.router.get(`${this.path}`, AuthMiddleware, this.contractor.getAllContractors);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.contractor.getContractor);
    this.router.put(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_edit', 'contractor'), this.contractor.updateContractor);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_delete', 'contractor'), this.contractor.deleteContractor);
  }
}
