import { SupplierToolMachineryController } from '@/controllers/supplier_tools_machinery.controller';
import { CreateSupplierToolsMachineryDto } from '@/dtos/supplier_tools_machinery.dto';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { PrivilegeMiddleware } from '@/middlewares/privilege.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';


export class SupplierToolsMachineryRoute implements Routes {
    public path = '/suppliers/tools/machinery';
    public router = Router();
    public supplierToolsMachinery = new SupplierToolMachineryController();
    
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, AuthMiddleware, PrivilegeMiddleware('can_create', 'supplier'), ValidationMiddleware(CreateSupplierToolsMachineryDto), this.supplierToolsMachinery.createSupplierToolMachinery);
        this.router.get(`${this.path}`, AuthMiddleware, PrivilegeMiddleware('can_view', 'supplier'), this.supplierToolsMachinery.getAllSupplierToolsMachinery);
        this.router.get(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_view', 'supplier'), this.supplierToolsMachinery.getSupplierToolMachinery);
        this.router.put(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_edit', 'supplier'), this.supplierToolsMachinery.updateSupplierToolMachinery);
        this.router.delete(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_delete', 'supplier'), this.supplierToolsMachinery.deleteSupplierToolMachinery);
    }

}