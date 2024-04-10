import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { MaterialController } from '@/controllers/material.controller';
import { CreateMaterialDto } from '@/dtos/material.dto';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';

export class MaterialRoute implements Routes {
  public path = '/materials';
  public router = Router();
  public material = new MaterialController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateMaterialDto), this.material.createMaterial);
    this.router.get(`${this.path}`, AuthMiddleware, this.material.getAllMaterials);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.material.getMaterial);
    this.router.get(`${this.path}/project/:projectCode`, AuthMiddleware, this.material.getMaterialsByProject);
    this.router.put(`${this.path}/:id`, AuthMiddleware, this.material.updateMaterial);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.material.deleteMaterial);
  }
}
