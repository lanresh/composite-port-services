import { SupplierService } from '@/services/supplier.service';
import { NextFunction, Request, Response } from 'express';
import { Supplier } from '@/interfaces/supplier.interface';

export class SupplierController {
  public supplier = new SupplierService();

  public createSupplier = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const supplierData: Supplier = req.body;
      const createSupplierData: Supplier = await this.supplier.createSupplier(supplierData);

      res.status(200).json({ data: createSupplierData, message: 'Supplier created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getAllSuppliers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const suppliersData: Supplier[] = await this.supplier.findAllSuppliers();

      res.status(200).json({ data: suppliersData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getSupplier = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const supplierId: number = +req.params.id;
      const supplierData: Supplier = await this.supplier.findSupplierById(supplierId);

      res.status(200).json({ data: supplierData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateSupplier = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const supplierId: number = +req.params.id;
      const supplierData: Supplier = req.body;

      const updatedSupplierData: Supplier = await this.supplier.updateSupplier(supplierId, supplierData);
      res.status(200).json({ data: updatedSupplierData, message: 'Data updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteSupplier = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const supplierId: number = +req.params.id;
      const deletedSupplierData: Supplier = await this.supplier.deleteSupplier(supplierId);

      res.status(200).json({ data: deletedSupplierData, message: 'Supplier deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
