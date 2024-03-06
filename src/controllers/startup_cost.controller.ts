import { Request, Response, NextFunction } from 'express';
import { StartupCost } from '@/interfaces/start_up_cost.interface';
import { StartUpCostService } from '@/services/startup_cost.service';

export class StartupCostController {
  public startup_cost = new StartUpCostService();

  public createStartUpCost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const startupCostData: StartupCost = req.body;
      const createStartUpCostData: StartupCost = await this.startup_cost.createStartUpCost(startupCostData);

      res.status(201).json({ data: createStartUpCostData, message: 'Start up cost created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getStartUpCosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const startUpCostsData: StartupCost[] = await this.startup_cost.findAllStartUpCosts();
      res.status(200).json({ data: startUpCostsData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getStartUpCost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const startUpCostId: number = +req.params.id;
      const startUpCostData: StartupCost = await this.startup_cost.findStartUpCostById(startUpCostId);
      res.status(200).json({ data: startUpCostData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getStartUpCostByCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectCode: string = req.params.code;
      const startUpCostData: number = await this.startup_cost.findStartUpCostByProjectCode(projectCode);
      res.status(200).json({ data: startUpCostData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateStartUpCost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const startUpCostId: number = +req.params.id;
      const startUpCostData: StartupCost = req.body;

      const updatedStartUpCostData: StartupCost = await this.startup_cost.updateStartUpCost(startUpCostId, startUpCostData);
      res.status(200).json({ data: updatedStartUpCostData, message: 'Data updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteStartUpCost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const startUpCostId: number = +req.params.id;

      const deletedStartUpCostData: StartupCost = await this.startup_cost.deleteStartUpCost(startUpCostId);
      res.status(200).json({ data: deletedStartUpCostData, message: 'Start up cost deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
