import { CreateConsultantDto } from '@/dtos/consultant.dto';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';
import { ConsultantController } from '@/controllers/consultant.controller';

export class ConsultantRoute implements Routes {
  public path = '/consultants';
  public router = Router();
  public consultant = new ConsultantController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateConsultantDto), this.consultant.createConsultant);
    this.router.get(`${this.path}`, AuthMiddleware, this.consultant.getAllConsultants);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.consultant.getConsultant);
    this.router.put(`${this.path}/:id`, AuthMiddleware, this.consultant.updateConsultant);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.consultant.deleteConsultant);
  }
}
