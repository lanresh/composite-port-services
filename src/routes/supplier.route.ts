import { SupplierController } from '@/controllers/supplier.controller';
import { CreateSupplierDto } from '@/dtos/supplier.dto';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { PrivilegeMiddleware } from '@/middlewares/privilege.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';


export class SupplierRoute implements Routes {
    public path = '/suppliers';
    public router = Router();
    public supplier = new SupplierController();
    
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, AuthMiddleware, PrivilegeMiddleware('can_create', 'supplier'), ValidationMiddleware(CreateSupplierDto), this.supplier.createSupplier);
        this.router.get(`${this.path}`, AuthMiddleware, this.supplier.getAllSuppliers);
        this.router.get(`${this.path}/:id`, AuthMiddleware, this.supplier.getSupplier);
        this.router.put(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_edit', 'supplier'), this.supplier.updateSupplier);
        this.router.delete(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_delete', 'supplier'), this.supplier.deleteSupplier);
    }

}