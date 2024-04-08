import { ClientProject } from '@/interfaces/client_project.interface';
import { ClientProjectService } from '@/services/client_project.service';
import { NextFunction, Request, Response } from 'express';

export class ClientProjectController {
  public clientProjectService = new ClientProjectService();

  public createClientProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientProjectData: ClientProject = req.body;
      const createClientProjectData: ClientProject = await this.clientProjectService.createClientProject(clientProjectData);
      res.status(201).json({ data: createClientProjectData, message: 'Client project created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public findAllClientProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientProjectsData: ClientProject[] = await this.clientProjectService.findAllClientProjects();
      res.status(200).json({ data: clientProjectsData, message: 'Client projects found successfully' });
    } catch (error) {
      next(error);
    }
  };

  public findClientProjectsByClientId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientId = req.params.id;
      const clientProjectsData: ClientProject[] = await this.clientProjectService.findClientProjectsByClientId(clientId);
      res.status(200).json({ data: clientProjectsData, message: 'Client projects found successfully' });
    } catch (error) {
      next(error);
    }
  };

  public findClientProjectsByProjectId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId = req.params.id;
      const clientProjectsData: ClientProject[] = await this.clientProjectService.findClientProjectsByProjectId(projectId);
      res.status(200).json({ data: clientProjectsData, message: 'Client projects found successfully' });
    } catch (error) {
      next(error);
    }
  };

  public findClientProjectsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const clientProjectsData: ClientProject = await this.clientProjectService.findClientProjectsById(id);
      res.status(200).json({ data: clientProjectsData, message: 'Client project found successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateClientProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const clientProjectData: ClientProject = req.body;
      const updateClientProjectData: ClientProject = await this.clientProjectService.updateClientProject(id, clientProjectData);
      res.status(200).json({ data: updateClientProjectData, message: 'Client project updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteClientProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const deleteClientProjectData = await this.clientProjectService.deleteClientProject(id);
      res.status(200).json({ data: deleteClientProjectData, message: 'Client project deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
