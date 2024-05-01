import { RequestCommentService } from '@/services/request_comment.service';
import { NextFunction, Request, Response } from 'express';
import { RequestComment } from '@/interfaces/request_comment.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class RequestCommentController {
  public requestComment = new RequestCommentService();

  public createRequestComment = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.userid;
      const requestCommentData: RequestComment = req.body;
      const createRequestCommentData: RequestComment = await this.requestComment.createRequestComment(userId, requestCommentData);
      res.status(201).json({ data: createRequestCommentData, message: 'Request comment created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getAllRequestComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestCommentsData: RequestComment[] = await this.requestComment.getAllRequestComments();
      res.status(200).json({ data: requestCommentsData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getRequestCommentsByRequestCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestCode = req.params.code;
      const requestCommentsData: RequestComment[] = await this.requestComment.getRequestCommentsByRequestCode(requestCode);
      res.status(200).json({ data: requestCommentsData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateRequestComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = +req.params.id;
      const requestCommentData: RequestComment = req.body;
      const updateRequestCommentData: RequestComment = await this.requestComment.updateRequestComment(id, requestCommentData);
      res.status(200).json({ data: updateRequestCommentData, message: 'Data updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteRequestComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = +req.params.id;
      const deleteRequestCommentData: RequestComment = await this.requestComment.deleteRequestComment(id);
      res.status(200).json({ data: deleteRequestCommentData, message: 'Data deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
