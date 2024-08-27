import { TenantController } from '@/controllers/tenant.controller';
import { CreateTenantDto } from '@/dtos/tenant.dto';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { PrivilegeMiddleware } from '@/middlewares/privilege.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class TenantRoute implements Routes {
  public path = '/tenants';
  public router = Router();
  public tenant = new TenantController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, PrivilegeMiddleware('can_create', 'project'), ValidationMiddleware(CreateTenantDto), this.tenant.createTenant);
    this.router.get(`${this.path}`, AuthMiddleware, this.tenant.getAllTenants);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.tenant.getTenant);
    this.router.get(`${this.path}/due/all`, AuthMiddleware, this.tenant.getAllUpcomingDueDates);
    this.router.get(`${this.path}/project/:code`, AuthMiddleware, this.tenant.getTenantByProjectCode);
    this.router.put(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_edit', 'project'), this.tenant.updateTenant);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_delete', 'project'), this.tenant.deleteTenant);
  }
}
