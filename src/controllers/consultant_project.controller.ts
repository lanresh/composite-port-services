import { ConsultantProjectService } from '@/services/consultant_project.service';
import { NextFunction, Request, Response } from 'express';
import { ConsultantProject } from '@/interfaces/consultant_project.interface';

export class ConsultantProjectController {
  public consultantProject = new ConsultantProjectService();

  public createConsultantProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const consultantProjectData: Partial<ConsultantProject> = req.body;
      const createConsultantProjectData: ConsultantProject = await this.consultantProject.createConsultantProject(consultantProjectData);

      res.status(200).json({ data: createConsultantProjectData, message: 'Consultant Project created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public findAllConsultantProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const consultantProjectData: ConsultantProject[] = await this.consultantProject.findAllConsultantProject();
      res.status(200).json({ data: consultantProjectData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public findConsultantProjectById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const consultantProjectId: number = +req.params.id;
      const consultantProjectData: ConsultantProject = await this.consultantProject.findConsultantProjectById(consultantProjectId);
      res.status(200).json({ data: consultantProjectData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public findAllConsultantProjectByConsultantId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const consultantId: string = req.params.id;
      const consultantProjectData: ConsultantProject[] = await this.consultantProject.findAllConsultantProjectByConsultantId(consultantId);
      res.status(200).json({ data: consultantProjectData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public findAllConsultantProjectByProjectCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectCode: string = req.params.code;
      const consultantProjectData: ConsultantProject[] = await this.consultantProject.findAllConsultantProjectByProjectCode(projectCode);
      res.status(200).json({ data: consultantProjectData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateConsultantProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const consultantProjectId: number = +req.params.id;
      const consultantProjectData: Partial<ConsultantProject> = req.body;
      const updateConsultantProjectData: ConsultantProject = await this.consultantProject.updateConsultantProject(
        consultantProjectId,
        consultantProjectData,
      );
      res.status(200).json({ data: updateConsultantProjectData, message: 'Consultant Project updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteConsultantProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const consultantProjectId: number = +req.params.id;
      const deleteConsultantProjectData: ConsultantProject = await this.consultantProject.deleteConsultantProject(consultantProjectId);
      res.status(200).json({ data: deleteConsultantProjectData, message: 'Consultant Project deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
