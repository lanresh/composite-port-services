import { RequestService } from '@/services/request.service';
import { NextFunction, Request, Response } from 'express';
import { Request as RequestEntity } from '@/interfaces/request.interface';

export class RequestController {
  public request = new RequestService();

  public createRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestData: RequestEntity = req.body;
      const createRequestData: RequestEntity = await this.request.createRequest(requestData);

      res.status(201).json({ data: createRequestData, message: 'Request created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getAllRequests = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestsData: RequestEntity[] = await this.request.findAllRequests();
      res.status(200).json({ data: requestsData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getAllUserRequests = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const requestsData: RequestEntity[] = await this.request.findRequestsByUser(userId);
      res.status(200).json({ data: requestsData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestId: number = +req.params.id;
      const requestData: RequestEntity = await this.request.findRequestById(requestId);
      res.status(200).json({ data: requestData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestId: number = +req.params.id;
      const requestData: RequestEntity = req.body;

      const updatedRequestData: RequestEntity = await this.request.updateRequest(requestId, requestData);
      res.status(200).json({ data: updatedRequestData, message: 'Data updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestId: number = +req.params.id;

      const deletedRequestData: RequestEntity = await this.request.deleteRequest(requestId);
      res.status(200).json({ data: deletedRequestData, message: 'Request deleted successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getAllSupervisorRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const supervisorId = req.params.id;
      const requestsData: RequestEntity[] = await this.request.getRequestBySupervisor(supervisorId);
      res.status(200).json({ data: requestsData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };
}
