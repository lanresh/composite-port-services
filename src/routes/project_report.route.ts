import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ProjectReportController } from '@/controllers/project_report.controller';


export class ProjectReportRoute implements Routes {
  public path = '/project_report';
  public router = Router();
  public projectReport = new ProjectReportController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.projectReport.findAllProjectReports);
    this.router.get(`${this.path}/:id`, this.projectReport.findProjectReportById);
    this.router.post(`${this.path}`, this.projectReport.createProjectReport);
    this.router.put(`${this.path}/:id`, this.projectReport.updateProjectReport);
    this.router.delete(`${this.path}/:id`, this.projectReport.deleteProjectReport);
}}