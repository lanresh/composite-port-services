import { SupplierMaterialController } from '@/controllers/supplier_material.controller';
import { CreateSupplierMaterialDto } from '@/dtos/supplier_material.dto';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { PrivilegeMiddleware } from '@/middlewares/privilege.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class SupplierMaterialRoute implements Routes {
  public path = '/suppliers-materials';
  public router = Router();
  public supplierMaterial = new SupplierMaterialController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      AuthMiddleware,
      PrivilegeMiddleware('can_create', 'supplier'),
      ValidationMiddleware(CreateSupplierMaterialDto),
      this.supplierMaterial.createSupplierMaterial,
    );
    this.router.get(`${this.path}`, AuthMiddleware, this.supplierMaterial.getAllSupplierMaterials);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.supplierMaterial.getSupplierMaterial);
    this.router.get(`${this.path}/types/all`, AuthMiddleware, this.supplierMaterial.getMaterialTypes);
    this.router.get(`${this.path}/sub-type/:id`, AuthMiddleware, this.supplierMaterial.getMaterialSubTypes);
    this.router.get(`${this.path}/type/description`, AuthMiddleware, this.supplierMaterial.getMaterialDescription);
    this.router.get(`${this.path}/supplier/description`, AuthMiddleware, this.supplierMaterial.getMaterialDescriptionBySupplierCode);
    this.router.put(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_edit', 'supplier'), this.supplierMaterial.updateSupplierMaterial);
    this.router.delete(
      `${this.path}/:id`,
      AuthMiddleware,
      PrivilegeMiddleware('can_delete', 'supplier'),
      this.supplierMaterial.deleteSupplierMaterial,
    );
  }
}
