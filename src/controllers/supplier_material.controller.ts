import { SupplierMaterialService } from '@/services/supplier_material.service';
import { NextFunction, Request, Response } from 'express';
import { SupplierMaterials } from '@/interfaces/supplier_materials.interface';
import { MaterialType } from '@/interfaces/material_type.interface';
import { MaterialSubType } from '@/interfaces/material_subtype.interface';

export class SupplierMaterialController {
  public supplierMaterial = new SupplierMaterialService();

  public createSupplierMaterial = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const materialData: SupplierMaterials = req.body;
      const createMaterialData: SupplierMaterials = await this.supplierMaterial.createSupplierMaterial(materialData);

      res.status(200).json({ data: createMaterialData, message: 'Supplier Material created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getAllSupplierMaterials = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const supplierMaterialsData: SupplierMaterials[] = await this.supplierMaterial.findAllSupplierMaterials();

      res.status(200).json({ data: supplierMaterialsData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getSupplierMaterial = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const supplierMaterialId: number = +req.params.id;
      const supplierMaterialData: SupplierMaterials = await this.supplierMaterial.findSupplierMaterialById(supplierMaterialId);

      res.status(200).json({ data: supplierMaterialData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getMaterialTypes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const materialTypesData: MaterialType[] = await this.supplierMaterial.fetchMaterialTypes();

      res.status(200).json({ data: materialTypesData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getMaterialSubTypes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const materialTypeId: number = +req.params.id;
      const materialSubTypesData: MaterialSubType[] = await this.supplierMaterial.fetchMaterialSubTypes(materialTypeId);

      res.status(200).json({ data: materialSubTypesData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getMaterialDescription = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const materialSubType: string = req.params.id;
      const materialDescription: MaterialSubType[] = await this.supplierMaterial.fetchMaterialDescription(materialSubType);

      res.status(200).json({ data: materialDescription, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateSupplierMaterial = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const supplierMaterialId: number = +req.params.id;
      const supplierMaterialData: SupplierMaterials = req.body;

      const updatedSupplierMaterialData: SupplierMaterials = await this.supplierMaterial.updateSupplierMaterial(
        supplierMaterialId,
        supplierMaterialData,
      );
      res.status(200).json({ data: updatedSupplierMaterialData, message: 'Data updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteSupplierMaterial = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const supplierMaterialId: number = +req.params.id;
      const deletedSupplierMaterialData: SupplierMaterials = await this.supplierMaterial.deleteSupplierMaterial(supplierMaterialId);

      res.status(200).json({ data: deletedSupplierMaterialData, message: 'Supplier Material deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
