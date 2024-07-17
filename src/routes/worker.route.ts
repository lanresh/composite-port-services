import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { WorkerController } from '@/controllers/worker.controller'; 
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { PrivilegeMiddleware } from '@/middlewares/privilege.middleware';



export class WorkerRoute implements Routes {
  public path = '/worker';
  public router = Router();
  public workerController = new WorkerController();

  

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, PrivilegeMiddleware('can_view', 'worker'), this.workerController.findAllWorkers);
    this.router.get(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_view', 'worker'), this.workerController.findWorkerById);
    this.router.post(`${this.path}`, AuthMiddleware, PrivilegeMiddleware('can_create', 'worker'), this.workerController.createWorker);
    this.router.put(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_edit', 'worker'), this.workerController.updateWorker);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_delete', 'worker'), this.workerController.deleteWorker);  
}}
