import { CreateConsultantDto } from '@/dtos/consultant.dto';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';
import { ConsultantController } from '@/controllers/consultant.controller';
import { PrivilegeMiddleware } from '@/middlewares/privilege.middleware';

export class ConsultantRoute implements Routes {
  public path = '/consultants';
  public router = Router();
  public consultant = new ConsultantController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      AuthMiddleware,
      PrivilegeMiddleware('can_create', 'consultant'),
      ValidationMiddleware(CreateConsultantDto),
      this.consultant.createConsultant,
    );
    this.router.get(`${this.path}`, AuthMiddleware, this.consultant.getAllConsultants);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.consultant.getConsultant);
    this.router.put(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_edit', 'consultant'), this.consultant.updateConsultant);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_delete', 'consultant'), this.consultant.deleteConsultant);
  }
}
