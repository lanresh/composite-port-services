import { RequestWithUser } from '@/interfaces/auth.interface';
import { Inventory } from '@/interfaces/inventory.interface';
import { InventoryService } from '@/services/invertory.service';
import { NextFunction, Request, Response } from 'express';


export class InventoryController {
  public inventoryService = new InventoryService();

  public findAllInventory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allInventory = await this.inventoryService.findAllInventory();
      res.status(200).json({ data: allInventory, message: 'all inventory' });
    }catch (error) {
      next(error);
    }
  }

  public findInventoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inventoryId = Number(req.params.id);
      const inventoryById = await this.inventoryService.findInventoryById(inventoryId);
      res.status(200).json({ data: inventoryById, message: 'inventory found' });
    }
    catch (error) {
      next(error);
    }   
  }

  public createInventory = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.userid;
      const inventoryData: Partial<Inventory> = req.body;
      const createInventory = await this.inventoryService.createInventory(userId, inventoryData);
      res.status(201).json({ data: createInventory, message: 'inventory created' });
    }
    catch (error) {
      next(error);
    }
  }

  public updateInventory = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.userid;
      const inventoryId = Number(req.params.id);
      const inventoryData: Inventory = req.body;
      const updateInventory = await this.inventoryService.updateInventory(userId, inventoryId, inventoryData);
      res.status(200).json({ data: updateInventory, message: 'inventory updated' });
    }
    catch (error) {
      next(error);
    }
  }

  public deleteInventory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inventoryId = Number(req.params.id);
      const deleteInventory = await this.inventoryService.deleteInventory(inventoryId);
      res.status(200).json({ data: deleteInventory, message: 'inventory deleted' });
    }
    catch (error) {
      next(error);
    }
  }

  public getAllInventoryTypes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allInventoryTypes = await this.inventoryService.getAllInventoryTypes();
      res.status(200).json({ data: allInventoryTypes, message: 'all inventory types' });
    }
    catch (error) {
      next(error);
    }    
  }

  public getInventoryByType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const type = req.query.type as string;
      const inventoryByType = await this.inventoryService.getInventoryByType(type);
      res.status(200).json({ data: inventoryByType, message: 'inventory by type' });
    }
    catch (error) {
      next(error);
    }
  }
}







