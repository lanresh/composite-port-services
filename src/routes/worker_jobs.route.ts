import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { WorkerJobsController } from '@/controllers/worker_jobs.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';



export class WorkerJobsRoute implements Routes {
  public path = '/worker-jobs';
  public router = Router();
  public workerJobsController = new WorkerJobsController();

  

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.workerJobsController.findAllWorkerJobs);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.workerJobsController.findWorkerJobById);
    this.router.get(`${this.path}/worker/:workerCode`, AuthMiddleware, this.workerJobsController.getWorkerJobsByWorker);
    this.router.post(`${this.path}`, AuthMiddleware, this.workerJobsController.createWorkerJob);
    this.router.put(`${this.path}/:id`, AuthMiddleware, this.workerJobsController.updateWorkerJob);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.workerJobsController.deleteWorkerJob);

}}
