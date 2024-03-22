import { uploadToS3 } from '@/helpers/s3.helper';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { MulterRequest } from '@/interfaces/multer.interface';
import { ProjectReport } from '@/interfaces/project_report.interface';
import { ProjectReportService } from '@/services/project_report.service';
import { NextFunction, Request, Response } from 'express';

export class ProjectReportController {
  public projectReportService = new ProjectReportService();

  public findAllProjectReports = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allProjectReports = await this.projectReportService.findAllProjectReports();
      res.status(200).json({ data: allProjectReports, message: 'all project reports' });
    } catch (error) {
      next(error);
    }
  };

  public findProjectReportById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reportId = Number(req.params.id);
      const reportById = await this.projectReportService.findProjectReportById(reportId);
      res.status(200).json({ data: reportById, message: 'project report found' });
    } catch (error) {
      next(error);
    }
  };

  public createProjectReport = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.userid;

      const reportData: ProjectReport = req.body;
      const createReport = await this.projectReportService.createProjectReport(userId, reportData);
      res.status(201).json({ data: createReport, message: 'project report created' });
    } catch (error) {
      next(error);
    }
  };

  public updateProjectReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reportId = Number(req.params.id);
      const reportData: ProjectReport = req.body;
      const updateReport = await this.projectReportService.updateProjectReport(reportId, reportData);
      res.status(200).json({ data: updateReport, message: 'project report updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteProjectReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reportId = Number(req.params.id);
      const deleteReport = await this.projectReportService.deleteProjectReport(reportId);
      res.status(200).json({ data: deleteReport, message: 'project report deleted' });
    } catch (error) {
      next(error);
    }
  };

  public uploadProjectReportImages = async (req: MulterRequest, res: Response, next: NextFunction) => {
    try {
      const reportId = Number(req.params.id);
      const files = req.files;
      const imageUrls = await uploadToS3(reportId, files);
      const reportData = { photograph_id: imageUrls };
  
      const uploadedProjectReportImages = await this.projectReportService.uploadProjectReportImages(reportId, reportData);
      res.status(200).json({ data: uploadedProjectReportImages, message: 'project report images uploaded' });
    } catch (error) {
      next(error);
    }
  };
}
