import { RequestWithUser } from '@/interfaces/auth.interface';
import { ToolFromStore } from '@/interfaces/tool_from_store.interface'; 
import { ToolFromStoreService } from '@/services/tool_from_store.service'; 
import { NextFunction, Request, Response } from 'express';

export class ToolFromStoreController {
    public toolFromStoreService = new ToolFromStoreService();

    public findAllToolFromStore = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const allToolFromStore = await this.toolFromStoreService.findAllToolsFromStore();
            res.status(200).json({ data: allToolFromStore, message: 'all tool from store' });
        } catch (error) {
            next(error);
        }
    }

    public findToolFromStoreById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const toolFromStoreId = Number(req.params.id);
            const toolFromStoreById = await this.toolFromStoreService.findToolFromStoreById(toolFromStoreId);
            res.status(200).json({ data: toolFromStoreById, message: 'tool from store found' });
        } catch (error) {
            next(error);
        }
    }

    public createToolFromStore = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const toolFromStoreData: ToolFromStore = req.body;
            const createToolFromStore = await this.toolFromStoreService.createToolFromStore(toolFromStoreData);
            res.status(201).json({ data: createToolFromStore, message: 'tool from store created' });
        } catch (error) {
            next(error);
        }
    }

    public updateToolFromStore = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const toolFromStoreId = Number(req.params.id);
            const toolFromStoreData: ToolFromStore = req.body;
            const updateToolFromStore = await this.toolFromStoreService.updateToolFromStore(toolFromStoreId, toolFromStoreData);
            res.status(200).json({ data: updateToolFromStore, message: 'tool from store updated' });
        } catch (error) {
            next(error);
        }
    }

    public deleteToolFromStore = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const toolFromStoreId = Number(req.params.id);
            const deleteToolFromStore = await this.toolFromStoreService.deleteToolFromStore(toolFromStoreId);
            res.status(200).json({ data: deleteToolFromStore, message: 'tool from store deleted' });
        } catch (error) {
            next(error);
        }
    }
}
































