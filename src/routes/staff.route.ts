import { StaffController } from '@/controllers/staff.controller';
import { CreateStaffDto } from '@/dtos/staff.dto';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { upload } from '@/middlewares/multer.middleware';
import { PrivilegeMiddleware } from '@/middlewares/privilege.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class StaffRoute implements Routes {
  public path = '/staffs';
  public router = Router();
  public staff = new StaffController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, PrivilegeMiddleware('can_create', 'staff'), ValidationMiddleware(CreateStaffDto), this.staff.createStaff);
    this.router.get(`${this.path}`, AuthMiddleware, PrivilegeMiddleware('can_view', 'staff'), this.staff.getAllStaffs);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.staff.getStaff);
    this.router.put(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_edit', 'staff'), this.staff.updateStaff);
    this.router.get(`${this.path}/roles/all`, AuthMiddleware, PrivilegeMiddleware('can_view', 'staff'), this.staff.getRoles);
    this.router.get(`${this.path}/role/all`, AuthMiddleware, PrivilegeMiddleware('can_view', 'staff'), this.staff.getStaffsByRole);
    this.router.put(`${this.path}/image/upload`, AuthMiddleware, PrivilegeMiddleware('can_edit', 'staff'), upload.single('image'), this.staff.uploadStaffImage);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_delete', 'staff'), this.staff.deleteStaff);
    this.router.post(`${this.path}/privileges`, AuthMiddleware, PrivilegeMiddleware('can_create', 'staff'), this.staff.assignPrivileges);
    this.router.get(`${this.path}/privileges/:id`, AuthMiddleware, this.staff.getPrivileges);
  }
}
