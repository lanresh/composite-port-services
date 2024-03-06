import { ProjectFlatService } from '@/services/project_flats.service';
import { Request, Response, NextFunction } from 'express';
import { ProjectFlats } from '@/interfaces/project_flats.interface';

export class ProjectFlatsController {
  public project_flats = new ProjectFlatService();

  public createProjectFlats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectFlatsData: ProjectFlats = req.body;
      const createProjectFlatsData: ProjectFlats = await this.project_flats.createProjectFlat(projectFlatsData);

      res.status(201).json({ data: createProjectFlatsData, message: 'Project flats created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getProjectFlats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectFlatsData: ProjectFlats[] = await this.project_flats.findAllProjectFlats();
      res.status(200).json({ data: projectFlatsData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getProjectFlat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const flatId: number = +req.params.id;
      const projectFlatsData: ProjectFlats = await this.project_flats.findProjectFlatById(flatId);
      res.status(200).json({ data: projectFlatsData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getProjectFlatsByProjectCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectCode = req.query.project_code as string;
      const projectFlatsData: ProjectFlats[] = await this.project_flats.findProjectFlatByProjectCode(projectCode);
      res.status(200).json({ data: projectFlatsData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateProjectFlats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const flatId: number = +req.params.id;
      const projectFlatsData: ProjectFlats = req.body;

      const updatedProjectFlatsData: ProjectFlats = await this.project_flats.updateProjectFlat(flatId, projectFlatsData);
      res.status(200).json({ data: updatedProjectFlatsData, message: 'Data updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteProjectFlats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const flatId: number = +req.params.id;

      const deletedProjectFlatsData: ProjectFlats = await this.project_flats.deleteProjectFlat(flatId);
      res.status(200).json({ data: deletedProjectFlatsData, message: 'Project flats deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
