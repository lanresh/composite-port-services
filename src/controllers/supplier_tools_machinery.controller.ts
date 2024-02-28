import { SupplierToolsMachineryService } from '@/services/supplier_tools_machinery.service';
import { NextFunction, Request, Response } from 'express';
import { SupplierToolsMachinery } from '@/interfaces/supplier_tools_machinery.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class SupplierToolMachineryController {
  public supplierToolMachinery = new SupplierToolsMachineryService();

  public createSupplierToolMachinery = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.user.userid;
      const supplierToolMachineryData: SupplierToolsMachinery = req.body;
      const createSupplierToolMachineryData: SupplierToolsMachinery = await this.supplierToolMachinery.createSupplierToolsMachinery(
        userId,
        supplierToolMachineryData,
      );

      res.status(200).json({ data: createSupplierToolMachineryData, message: 'Supplier Tool Machinery created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getAllSupplierToolsMachinery = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const supplierToolsMachineryData: SupplierToolsMachinery[] = await this.supplierToolMachinery.findAllSupplierToolsMachinery();

      res.status(200).json({ data: supplierToolsMachineryData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getSupplierToolMachinery = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const supplierToolMachineryId: number = +req.params.id;
      const supplierToolMachineryData: SupplierToolsMachinery = await this.supplierToolMachinery.findSupplierToolsMachineryById(
        supplierToolMachineryId,
      );

      res.status(200).json({ data: supplierToolMachineryData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateSupplierToolMachinery = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const supplierToolMachineryId: number = +req.params.id;
      const supplierToolMachineryData: SupplierToolsMachinery = req.body;

      const updateSupplierToolMachineryData: SupplierToolsMachinery = await this.supplierToolMachinery.updateSupplierToolsMachinery(
        supplierToolMachineryId,
        supplierToolMachineryData,
      );
      res.status(200).json({ data: updateSupplierToolMachineryData, message: 'Supplier Tool Machinery updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteSupplierToolMachinery = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const supplierToolMachineryId: number = +req.params.id;

      const deleteSupplierToolMachineryData: SupplierToolsMachinery = await this.supplierToolMachinery.deleteSupplierToolsMachinery(
        supplierToolMachineryId,
      );
      res.status(200).json({ data: deleteSupplierToolMachineryData, message: 'Supplier Tool Machinery deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
