import { WorkerProjectService } from '@/services/worker_project.service';
import { Request, Response, NextFunction } from 'express';
import { ProjectWorker } from '@/interfaces/project_worker.interface';

export class WorkerProjectController {
  public workerProjectService = new WorkerProjectService();

  public createWorkerProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workerProjectData: ProjectWorker = req.body;
      const createWorkerProjectData: ProjectWorker = await this.workerProjectService.createWorkerProject(workerProjectData);
      res.status(201).json({ data: createWorkerProjectData, message: 'Worker project created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public findAllWorkerProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allWorkerProjects: ProjectWorker[] = await this.workerProjectService.findAllWorkerProjects();
      res.status(200).json({ data: allWorkerProjects, message: 'all worker projects' });
    } catch (error) {
      next(error);
    }
  };

  public findWorkerProjectByProjectCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectCode: string = req.params.code;
      const allWorkerProjects: ProjectWorker[] = await this.workerProjectService.findWorkerProjectByProjectCode(projectCode);
      res.status(200).json({ data: allWorkerProjects, message: 'all worker projects' });
    } catch (error) {
      next(error);
    }
  };

  public deleteWorkerProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workerProjectId: number = +req.params.id;
      const deleteWorkerProjectData: ProjectWorker = await this.workerProjectService.deleteWorkerProject(workerProjectId);
      res.status(200).json({ data: deleteWorkerProjectData, message: 'Worker project deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
