import { Request, Response, NextFunction } from 'express';
import { MaterialService } from '../services/material.service';
import { Material } from '../interfaces/material.interface';

export class MaterialController {
  public material = new MaterialService();

  public createMaterial = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const materialData: Material = req.body;
      const createMaterialData: Material = await this.material.createMaterial(materialData);
      res.status(201).json({ data: createMaterialData, message: 'Material created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getAllMaterials = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const materialsData: Material[] = await this.material.findAllMaterials();
      res.status(200).json({ data: materialsData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getMaterial = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const materialId: number = +req.params.id;
      const materialData: Material = await this.material.findMaterialById(materialId);
      res.status(200).json({ data: materialData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getMaterialsByProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectCode: string = req.params.projectCode;
      const materialsData: Material[] = await this.material.findAllMaterialsByProject(projectCode);
      res.status(200).json({ data: materialsData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateMaterial = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const materialId: number = +req.params.id;
      const materialData: Material = req.body;
      const updatedMaterialData: Material = await this.material.updateMaterial(materialId, materialData);
      res.status(200).json({ data: updatedMaterialData, message: 'Data updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteMaterial = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const materialId: number = +req.params.id;
      const deletedMaterialData: Material = await this.material.deleteMaterial(materialId);
      res.status(200).json({ data: deletedMaterialData, message: 'Material deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
