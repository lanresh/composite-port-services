import { ConsultantService } from '@/services/consultant.service';
import { NextFunction, Request, Response } from 'express';
import { Consultant } from '@/interfaces/consultant.interface';

export class ConsultantController {
  public consultant = new ConsultantService();

  public createConsultant = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const consultantData: Partial<Consultant> = req.body;
      const createConsultantData: Consultant = await this.consultant.createConsultant(consultantData);

      res.status(200).json({ data: createConsultantData, message: 'Consultant created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getAllConsultants = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const consultantData: Consultant[] = await this.consultant.findAllConsultant();
      res.status(200).json({ data: consultantData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getConsultant = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const consultantId: number = +req.params.id;
      const consultantData: Consultant = await this.consultant.findConsultantById(consultantId);
      res.status(200).json({ data: consultantData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateConsultant = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const consultantId: number = +req.params.id;
      const consultantData: Partial<Consultant> = req.body;
      const updateConsultantData: Consultant = await this.consultant.updateConsultant(consultantId, consultantData);
      res.status(200).json({ data: updateConsultantData, message: 'Consultant updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteConsultant = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const consultantId: number = +req.params.id;
      const deleteConsultantData: Consultant = await this.consultant.deleteConsultant(consultantId);
      res.status(200).json({ data: deleteConsultantData, message: 'Consultant deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
