import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ProjectReportController } from '@/controllers/project_report.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { upload } from '@/middlewares/multer.middleware';
import { PrivilegeMiddleware } from '@/middlewares/privilege.middleware';

export class ProjectReportRoute implements Routes {
  public path = '/project_report';
  public router = Router();
  public projectReport = new ProjectReportController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.projectReport.findAllProjectReports);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.projectReport.findProjectReportById);
    this.router.post(`${this.path}`, AuthMiddleware, PrivilegeMiddleware('can_create', 'report'), this.projectReport.createProjectReport);
    this.router.put(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_edit', 'report'), this.projectReport.updateProjectReport);
    this.router.put(
      `${this.path}/images/:id`,
      AuthMiddleware,
      PrivilegeMiddleware('can_edit', 'report'),
      upload.array('images'),
      this.projectReport.uploadProjectReportImages,
    );
    this.router.delete(`${this.path}/:id`, AuthMiddleware, PrivilegeMiddleware('can_delete', 'report'), this.projectReport.deleteProjectReport);
  }
}
