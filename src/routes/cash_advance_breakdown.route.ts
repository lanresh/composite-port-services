import { CashAdvanceBreakdownController } from '@/controllers/cash_advance_breakdown.controller';
import { CreateCashAdvanceBreakdownDto } from '@/dtos/cash_advance_breakdown.dto';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class CashAdvanceBreakdownRoute implements Routes {
    public path = '/cash-advance-breakdowns';
    public router = Router();
    public cash_advance_breakdown = new CashAdvanceBreakdownController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateCashAdvanceBreakdownDto), this.cash_advance_breakdown.createCashAdvanceBreakdown);
        this.router.get(`${this.path}`, AuthMiddleware, this.cash_advance_breakdown.getCashAdvanceBreakdowns);
        this.router.get(`${this.path}/:id`, AuthMiddleware, this.cash_advance_breakdown.getCashAdvanceBreakdown);
        this.router.put(`${this.path}/:id`, AuthMiddleware, this.cash_advance_breakdown.updateCashAdvanceBreakdown);
        this.router.delete(`${this.path}/:id`, AuthMiddleware, this.cash_advance_breakdown.deleteCashAdvanceBreakdown);
    }
}