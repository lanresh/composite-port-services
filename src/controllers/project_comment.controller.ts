import { ProjectCommentService } from '@/services/project_comment.service';
import { NextFunction, Request, Response } from 'express';
import { ProjectComment } from '@/interfaces/project_comment.interface';

export class ProjectCommentController {
  public projectComment = new ProjectCommentService();

  public createProjectComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectCommentData: ProjectComment = req.body;
      const createProjectCommentData: ProjectComment = await this.projectComment.createProjectComment(projectCommentData);

      res.status(200).json({ data: createProjectCommentData, message: 'Project Comment created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public findAllProjectComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectCommentData: ProjectComment[] = await this.projectComment.findAllProjectComment();

      res.status(200).json({ data: projectCommentData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public findProjectCommentByProjectCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectCode: string = req.params.id;
      const projectCommentData: ProjectComment[] = await this.projectComment.findProjectCommentByProjectCode(projectCode);

      res.status(200).json({ data: projectCommentData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public findProjectCommentByClientId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientId: string = req.params.id;
      const projectCommentData: ProjectComment[] = await this.projectComment.findProjectCommentByClientId(clientId);

      res.status(200).json({ data: projectCommentData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };
}
