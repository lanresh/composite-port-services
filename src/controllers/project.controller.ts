import { RequestWithUser } from '@/interfaces/auth.interface';
import { Project } from '@/interfaces/project.interface';
import { ProjectService } from '@/services/project.service';
import { NextFunction, Request, Response } from 'express';

export class ProjectController {
  public project = new ProjectService();

  public createProject = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.userid;
      const projectData: Project = req.body;
      const createProjectData: Project = await this.project.createProject(userId, projectData);

      res.status(200).json({ data: createProjectData, message: 'Project created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getAllProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectData: Project[] = await this.project.findAllProject();

      res.status(200).json({ data: projectData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId: number = +req.params.id;

      const projectData: Project = await this.project.findProjectById(projectId);
      res.status(200).json({ data: projectData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId: number = +req.params.id;
      const projectData: Project = req.body;

      const updatedProjectData: Project = await this.project.updateProject(projectId, projectData);
      res.status(200).json({ data: updatedProjectData, message: 'Data updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId: number = +req.params.id;

      const deletedProjectData: Project = await this.project.deleteProject(projectId);
      res.status(200).json({ data: deletedProjectData, message: 'Project deleted successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getProjectSummary = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectCode: string = req.params.code;
      const projectData: Project = await this.project.getProjectSummary(projectCode);
      res.status(200).json({ data: projectData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getProjectsBySupervisor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const supervisorId = req.params.id;
      const projects = await this.project.findProjectBySupervisorId(supervisorId);
      res.status(200).json({ data: projects, message: 'Projects fetched successfully' });
    } catch (error) {
      next(error);
    }
  }
}
