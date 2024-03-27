import { photoUpload } from '@/helpers/s3.helper';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { MulterRequest } from '@/interfaces/multer.interface';
import { Staff } from '@/interfaces/staff.interface';
import { StaffService } from '@/services/staff.service';
import { NextFunction, Request, Response } from 'express';

export class StaffController {
  public staff = new StaffService();

  public createStaff = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const staffData: Staff = req.body;
      const createStaffData: Staff = await this.staff.createStaff(staffData);

      res.status(200).json({ data: createStaffData, message: 'Staff created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getAllStaffs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const staffsData: Staff[] = await this.staff.findAllStaff();

      res.status(200).json({ data: staffsData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getStaff = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;

      const staffData: Staff = await this.staff.findStaffById(userId);
      res.status(200).json({ data: staffData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateStaff = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const staffData: Staff = req.body;

      const updateStaffData: Staff = await this.staff.updateStaff(userId, staffData);
      res.status(200).json({ data: updateStaffData, message: 'Data updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rolesData: Staff[] = await this.staff.getAllRoles();

      res.status(200).json({ data: rolesData, message: 'Roles fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getStaffsByRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const role: string = req.query.role as string;

      const getStaffData: Staff[] = await this.staff.getRoleStaffs(role);
      res.status(200).json({ data: getStaffData, message: 'Staffs fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteStaff = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;

      const deleteStaffData: Staff = await this.staff.deleteStaff(userId);
      res.status(200).json({ data: deleteStaffData, message: 'Staff deleted successfully' });
    } catch (error) {
      next(error);
    }
  };

  public uploadStaffImage = async (req: MulterRequest, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.user.userid;
      const files = req.file;
      const imageUrl = await photoUpload(userId, files);

      const uploadedStaffImage: Staff = await this.staff.updateStaff(userId, { image: imageUrl });
      res.status(200).json({ data: uploadedStaffImage, message: 'Staff image uploaded successfully' });
    } catch (error) {
      next(error);
    }
  }
}
