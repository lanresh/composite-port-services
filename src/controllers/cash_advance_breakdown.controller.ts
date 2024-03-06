import { Request, Response, NextFunction } from 'express';
import { CashAdvanceBreakdown } from '@/interfaces/cash_advance_breakdown.interface';
import { CashAdvanceBreakdownService } from '@/services/cash_advance_breakdown.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class CashAdvanceBreakdownController {
  public cash_advance_breakdown = new CashAdvanceBreakdownService();

  public createCashAdvanceBreakdown = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.userid;
      const cashAdvanceBreakdownData: CashAdvanceBreakdown = req.body;
      const createCashAdvanceBreakdownData: CashAdvanceBreakdown = await this.cash_advance_breakdown.createCashAdvanceBreakdown(
        userId,
        cashAdvanceBreakdownData,
      );
      res.status(201).json({ data: createCashAdvanceBreakdownData, message: 'Cash advance breakdown created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getCashAdvanceBreakdowns = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cashAdvanceBreakdownsData: CashAdvanceBreakdown[] = await this.cash_advance_breakdown.findAllCashAdvanceBreakdowns();
      res.status(200).json({ data: cashAdvanceBreakdownsData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getCashAdvanceBreakdown = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cashAdvanceBreakdownId: number = +req.params.id;
      const cashAdvanceBreakdownData: CashAdvanceBreakdown = await this.cash_advance_breakdown.findCashAdvanceBreakdownById(cashAdvanceBreakdownId);
      res.status(200).json({ data: cashAdvanceBreakdownData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateCashAdvanceBreakdown = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cashAdvanceBreakdownId: number = +req.params.id;
      const cashAdvanceBreakdownData: CashAdvanceBreakdown = req.body;

      const updatedCashAdvanceBreakdownData: CashAdvanceBreakdown = await this.cash_advance_breakdown.updateCashAdvanceBreakdown(
        cashAdvanceBreakdownId,
        cashAdvanceBreakdownData,
      );
      res.status(200).json({ data: updatedCashAdvanceBreakdownData, message: 'Data updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCashAdvanceBreakdown = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cashAdvanceBreakdownId: number = +req.params.id;

      const deletedCashAdvanceBreakdownData: CashAdvanceBreakdown = await this.cash_advance_breakdown.deleteCashAdvanceBreakdown(
        cashAdvanceBreakdownId,
      );
      res.status(200).json({ data: deletedCashAdvanceBreakdownData, message: 'Cash advance breakdown deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
