import { RequestWithUser } from '@/interfaces/auth.interface';
import { ProjectTeam } from '@/interfaces/project_team.interface';
import { ProjectTeamService } from '@/services/project_team.service';
import { NextFunction, Request, Response } from 'express';

export class ProjectTeamController {
  public projectTeam = new ProjectTeamService();

  public createProjectTeam = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const projectTeamData: ProjectTeam = req.body;
      const createProjectTeamData: ProjectTeam = await this.projectTeam.createProjectTeam(projectTeamData);

      res.status(200).json({ data: createProjectTeamData, message: 'Project Team created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getAllProjectTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectTeamData: ProjectTeam[] = await this.projectTeam.findAllProjectTeam();

      res.status(200).json({ data: projectTeamData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getProjectTeamByProjectCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectCode: string = req.params.code;
      const projectTeamData: ProjectTeam[] = await this.projectTeam.findProjectTeamByProjectCode(projectCode);

      res.status(200).json({ data: projectTeamData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };
}
