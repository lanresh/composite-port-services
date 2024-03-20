import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { WorkerController } from '@/controllers/worker.controller'; 
import { AuthMiddleware } from '@/middlewares/auth.middleware';



export class WorkerRoute implements Routes {
  public path = '/worker';
  public router = Router();
  public workerController = new WorkerController();

  

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.workerController.findAllWorkers);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.workerController.findWorkerById);
    this.router.post(`${this.path}`, AuthMiddleware, this.workerController.createWorker);
    this.router.put(`${this.path}/:id`, AuthMiddleware, this.workerController.updateWorker);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.workerController.deleteWorker);  
}}
