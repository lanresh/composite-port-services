
import { RequestWithUser } from '@/interfaces/auth.interface';
import { Worker } from '@/interfaces/worker.interface';
import { WorkerService } from '@/services/worker.service';
import { NextFunction, Request, Response } from 'express';

export class WorkerController {
    public workerService = new WorkerService();

    public findAllWorkers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const allWorkers = await this.workerService.findAllWorkers();
            res.status(200).json({ data: allWorkers, message: 'all workers' });
        } catch (error) {
            next(error);
        }
    }

    public findWorkerById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const workerId = Number(req.params.id);
            const workerById = await this.workerService.findWorkerById(workerId);
            res.status(200).json({ data: workerById, message: 'worker found' });
        } catch (error) {
            next(error);
        }
    }

    public createWorker = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const workerData: Worker = req.body;
            const createWorker = await this.workerService.createWorker( workerData);
            res.status(201).json({ data: createWorker, message: 'worker created' });
        } catch (error) {
            next(error);
        }
    }

    public updateWorker = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const workerId = Number(req.params.id);
            const workerData: Worker = req.body;
            const updateWorker = await this.workerService.updateWorker(workerId, workerData);
            res.status(200).json({ data: updateWorker, message: 'worker updated' });
        } catch (error) {
            next(error);
        }
    }

    public deleteWorker = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const workerId = Number(req.params.id);
            const deleteWorker = await this.workerService.deleteWorker(workerId);
            res.status(200).json({ data: deleteWorker, message: 'worker deleted' });
        } catch (error) {
            next(error);
        }
    }
}




































