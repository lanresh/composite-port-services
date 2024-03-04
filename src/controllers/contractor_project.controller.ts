import { RequestWithUser } from '@/interfaces/auth.interface';
import { ContractorProjectService } from '@/services/contractor_project.service';
import { NextFunction, Request, Response } from 'express';
import { ContractorProject } from '@/interfaces/contractor_project.interface';

export class ContractorProjectController {
  public contractorProject = new ContractorProjectService();

  public createContractorProject = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.userid;
      const contractorProjectData: Partial<ContractorProject> = req.body;
      const createContractorProjectData: ContractorProject = await this.contractorProject.createContractorProject(userId, contractorProjectData);
      res.status(200).json({ data: createContractorProjectData, message: 'Contractor project created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public findAllContractorProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contractorProjectData: ContractorProject[] = await this.contractorProject.findAllContractorProject();
      res.status(200).json({ data: contractorProjectData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getContractorProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contractorProjectId: number = +req.params.id;
      const contractorProjectData: ContractorProject = await this.contractorProject.findContractorProjectById(contractorProjectId);
      res.status(200).json({ data: contractorProjectData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateContractorProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contractorProjectId: number = +req.params.id;
      const contractorProjectData: Partial<ContractorProject> = req.body;
      const updateContractorProjectData: ContractorProject = await this.contractorProject.updateContractorProject(
        contractorProjectId,
        contractorProjectData,
      );
      res.status(200).json({ data: updateContractorProjectData, message: 'Contractor project updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteContractorProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contractorProjectId: number = +req.params.id;
      const deleteContractorProjectData: ContractorProject = await this.contractorProject.deleteContractorProject(contractorProjectId);
      res.status(200).json({ data: deleteContractorProjectData, message: 'Contractor project deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
