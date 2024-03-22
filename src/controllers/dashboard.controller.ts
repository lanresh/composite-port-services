import { Project } from '@/interfaces/project.interface';
import { DashboardService } from '@/services/dashboard.service';
import { NextFunction, Request, Response } from 'express';
import { Request as PendingRequest } from '@/interfaces/request.interface';

export class DashboardController {
  public dashboard = new DashboardService();

  public entityCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entityCountData: {} = await this.dashboard.entityCount();
      res.status(200).json({ data: entityCountData, message: 'entity count data returned successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getPendingProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pendingProjectData: Project[] = await this.dashboard.findAllPendingProjects();
      res.status(200).json({ data: pendingProjectData, message: 'Pending Project Fetched Successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getPendingRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pendingRequestData: PendingRequest[] = await this.dashboard.findAllPendingRequest();
      res.status(200).json({ data: pendingRequestData, message: 'Pending Request Fetched Successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getStaffAndWorkerCountPerMonth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const staffAndWorkerCountData: {} = await this.dashboard.findAllStaffAndWorkerCountPerMonth();
      res.status(200).json({ data: staffAndWorkerCountData, message: 'Staff And Worker Count Per Month Fetched Successfully' });
    } catch (error) {
      next(error);
    }
  }
}
