import { RequestWithUser } from '@/interfaces/auth.interface';
import { WorkerJobs } from '@/interfaces/worker_jobs.interface';
import { WorkerJobsService } from '@/services/worker_jobs.service';
import { NextFunction, Request, Response } from 'express';

export class WorkerJobsController {
  public workerJobsService = new WorkerJobsService();

  public findAllWorkerJobs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allWorkerJobs = await this.workerJobsService.findAllWorkerJobs();
      res.status(200).json({ data: allWorkerJobs, message: 'all worker jobs' });
    } catch (error) {
      next(error);
    }
  };

  public findWorkerJobById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workerJobId = Number(req.params.id);
      const workerJobById = await this.workerJobsService.findWorkerJobById(workerJobId);
      res.status(200).json({ data: workerJobById, message: 'worker job found' });
    } catch (error) {
      next(error);
    }
  };

  public getWorkerJobsByWorker = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workerCode = req.params.workerCode;
      const workerJobsByWorker = await this.workerJobsService.findWorkerJobsByWorker(workerCode);
      res.status(200).json({ data: workerJobsByWorker, message: 'worker jobs found' });
    } catch (error) {
      next(error);
    }
  };

  public createWorkerJob = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const workerJobData: WorkerJobs = req.body;
      const createWorkerJob = await this.workerJobsService.createWorkerJob(workerJobData);
      res.status(201).json({ data: createWorkerJob, message: 'worker job created' });
    } catch (error) {
      next(error);
    }
  };

  public updateWorkerJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workerJobId = Number(req.params.id);
      const workerJobData: WorkerJobs = req.body;
      const updateWorkerJob = await this.workerJobsService.updateWorkerJob(workerJobId, workerJobData);
      res.status(200).json({ data: updateWorkerJob, message: 'worker job updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteWorkerJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workerJobId = Number(req.params.id);
      const deleteWorkerJob = await this.workerJobsService.deleteWorkerJob(workerJobId);
      res.status(200).json({ data: deleteWorkerJob, message: 'worker job deleted' });
    } catch (error) {
      next(error);
    }
  };
}
