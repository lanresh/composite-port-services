import { RequestWithUser } from '@/interfaces/auth.interface';
import { StakeholderProject } from '@/interfaces/stakeholder_project.interface';
import { StakeholderProjectService } from '@/services/stakeholder_project.service';
import { NextFunction, Request, Response } from 'express';

export class StakeholderProjectController {
  public stakeholderProjectService = new StakeholderProjectService();

  public findAllStakeholderProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allStakeholderProjects = await this.stakeholderProjectService.findAllStakeholderProjects();
      res.status(200).json({ data: allStakeholderProjects, message: 'all stakeholders' });
    } catch (error) {
      next(error);
    }
  };

  public findStakeholderProjectById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stakeholderProjectId = Number(req.params.id);
      const stakeholderProjectById = await this.stakeholderProjectService.findStakeholderProjectById(stakeholderProjectId);
      res.status(200).json({ data: stakeholderProjectById, message: 'stakeholder found' });
    } catch (error) {
      next(error);
    }
  };

  public findStakeholderProjectByCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stakeholderProjectCode = req.params.code;
      const stakeholderProjectByCode = await this.stakeholderProjectService.findStakeholderProjectByCode(stakeholderProjectCode);
      res.status(200).json({ data: stakeholderProjectByCode, message: 'stakeholder found' });
    } catch (error) {
      next(error);
    }
  };

  public createStakeholderProject = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const stakeholderId = req.user.userid;
      const stakeholderProjectData: StakeholderProject = req.body;
      const createStakeholderProject = await this.stakeholderProjectService.createStakeholderProject(stakeholderId, stakeholderProjectData);
      res.status(201).json({ data: createStakeholderProject, message: 'stakeholder created' });
    } catch (error) {
      next(error);
    }
  };

  public updateStakeholderProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stakeholderProjectId = Number(req.params.id);
      const stakeholderProjectData: StakeholderProject = req.body;
      const updateStakeholderProject = await this.stakeholderProjectService.updateStakeholderProject(stakeholderProjectId, stakeholderProjectData);
      res.status(200).json({ data: updateStakeholderProject, message: 'stakeholder updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteStakeholderProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stakeholderProjectId = Number(req.params.id);
      const deleteStakeholderProject = await this.stakeholderProjectService.deleteStakeholderProject(stakeholderProjectId);
      res.status(200).json({ data: deleteStakeholderProject, message: 'stakeholder deleted' });
    } catch (error) {
      next(error);
    }
  };
}
