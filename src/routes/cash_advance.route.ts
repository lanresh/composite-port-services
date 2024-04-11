import { CashAdvanceController } from '@/controllers/cash_advance.controller';
import { CreateCashAdvanceDto } from '@/dtos/cash_advance.dto';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class CashAdvanceRoute implements Routes {
  public path = '/cash-advances';
  public router = Router();
  public cash_advance = new CashAdvanceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateCashAdvanceDto), this.cash_advance.createCashAdvance);
    this.router.get(`${this.path}`, AuthMiddleware, this.cash_advance.getCashAdvances);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.cash_advance.getCashAdvance);
    this.router.get(`${this.path}/project-code/:code`, AuthMiddleware, this.cash_advance.getCashAdvanceByProjectCode);
    this.router.put(`${this.path}/:id`, AuthMiddleware, this.cash_advance.updateCashAdvance);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.cash_advance.deleteCashAdvance);
  }
}
