import { Request, Response, NextFunction } from 'express';
import { CashAdvance } from '@/interfaces/cash_advance.interface';
import { CashAdvanceService } from '@/services/cash_advance.service';

export class CashAdvanceController {
  public cash_advance = new CashAdvanceService();

  public createCashAdvance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cashAdvanceData: CashAdvance = req.body;
      const createCashAdvanceData: CashAdvance = await this.cash_advance.createCashAdvance(cashAdvanceData);

      res.status(201).json({ data: createCashAdvanceData, message: 'Cash advance created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getCashAdvances = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cashAdvancesData: CashAdvance[] = await this.cash_advance.findAllCashAdvances();
      res.status(200).json({ data: cashAdvancesData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getCashAdvance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cashId: number = +req.params.id;
      const cashAdvanceData: CashAdvance = await this.cash_advance.findCashAdvanceById(cashId);
      res.status(200).json({ data: cashAdvanceData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getCashAdvanceByProjectCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectCode: string = req.params.code;
      const cashAdvanceData: CashAdvance[] = await this.cash_advance.findCashAdvanceByProjectCode(projectCode);
      res.status(200).json({ data: cashAdvanceData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateCashAdvance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cashId: number = +req.params.id;
      const cashAdvanceData: CashAdvance = req.body;

      const updatedCashAdvanceData: CashAdvance = await this.cash_advance.updateCashAdvance(cashId, cashAdvanceData);
      res.status(200).json({ data: updatedCashAdvanceData, message: 'Data updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCashAdvance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cashId: number = +req.params.id;

      const deletedCashAdvanceData: CashAdvance = await this.cash_advance.deleteCashAdvance(cashId);
      res.status(200).json({ data: deletedCashAdvanceData, message: 'Cash advance deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
