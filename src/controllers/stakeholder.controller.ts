import { RequestWithUser } from '@/interfaces/auth.interface';
import { Stakeholder } from '@/interfaces/stakeholder.interface';
import { StakeholderService } from '@/services/stakeholder.service';
import { NextFunction, Request, Response } from 'express';

export class StakeholderController {
    public stakeholderService = new StakeholderService();

    public findAllStakeholders = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const allStakeholders = await this.stakeholderService.findAllStakeholders();
            res.status(200).json({ data: allStakeholders, message: 'all stakeholders' });
        } catch (error) {
            next(error);
        }
     }

    public findStakeholderById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const stakeholderId = Number(req.params.id);
            const stakeholderById = await this.stakeholderService.findStakeholderById(stakeholderId);
            res.status(200).json({ data: stakeholderById, message: 'stakeholder found' });
        } catch (error) {
            next(error);
        }
    }
    
    public createStakeholder = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const stakeholderData: Stakeholder = req.body;
            const createStakeholder = await this.stakeholderService.createStakeholder(stakeholderData);
            res.status(201).json({ data: createStakeholder, message: 'stakeholder created' });
        } catch (error) {
            next(error);
        }
     }

    public updateStakeholder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const stakeholderId = Number(req.params.id);
            const stakeholderData: Stakeholder = req.body;
            const updateStakeholder = await this.stakeholderService.updateStakeholder(stakeholderId, stakeholderData);
            res.status(200).json({ data: updateStakeholder, message: 'stakeholder updated' });
        } catch (error) {
            next(error);
        }
    }
    
    public deleteStakeholder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const stakeholderId = Number(req.params.id);
            const deleteStakeholder = await this.stakeholderService.deleteStakeholder(stakeholderId);
            res.status(200).json({ data: deleteStakeholder, message: 'stakeholder deleted' });
        } catch (error) {
            next(error);
        }
    }
}
