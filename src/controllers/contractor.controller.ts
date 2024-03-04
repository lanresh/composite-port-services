import { ContractorService } from '@/services/contractor.service';
import { NextFunction, Request, Response } from 'express';
import { Contractor } from '@/interfaces/contractor.interface';

export class ContractorController {
  public contractor = new ContractorService();

  public createContractor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contractorData: Partial<Contractor> = req.body;
      const createContractorData: Contractor = await this.contractor.createContractor(contractorData);

      res.status(200).json({ data: createContractorData, message: 'Contractor created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getAllContractors = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contractorData: Contractor[] = await this.contractor.findAllContractor();
      res.status(200).json({ data: contractorData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getContractor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contractorId: number = +req.params.id;
      const contractorData: Contractor = await this.contractor.findContractorById(contractorId);
      res.status(200).json({ data: contractorData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateContractor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contractorId: number = +req.params.id;
      const contractorData: Partial<Contractor> = req.body;
      const updateContractorData: Contractor = await this.contractor.updateContractor(contractorId, contractorData);
      res.status(200).json({ data: updateContractorData, message: 'Contractor updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteContractor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contractorId: number = +req.params.id;
      const deleteContractorData: Contractor = await this.contractor.deleteContractor(contractorId);
      res.status(200).json({ data: deleteContractorData, message: 'Contractor deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
