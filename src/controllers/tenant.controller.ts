import { TenantService } from '@/services/tenant.service';
import { NextFunction, Request, Response } from 'express';
import { Tenant } from '@/interfaces/tenants.interface';

export class TenantController {
  public tenant = new TenantService();

  public createTenant = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tenantData: Tenant = req.body;
      const createTenantData: Tenant = await this.tenant.createTenant(tenantData);

      res.status(200).json({ data: createTenantData, message: 'Tenant created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getAllTenants = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tenantsData: Tenant[] = await this.tenant.findAllTenants();

      res.status(200).json({ data: tenantsData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getTenant = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tenantId: number = +req.params.id;
      const tenantData: Tenant = await this.tenant.findTenantById(tenantId);

      res.status(200).json({ data: tenantData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getAllUpcomingDueDates = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tenantsData: Tenant[] = await this.tenant.findAllUpcomingDueDates();

      res.status(200).json({ data: tenantsData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getTenantByProjectCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectCode: string = req.params.code;
      const tenantData: Tenant[] = await this.tenant.findTenantByProjectCode(projectCode);
      res.status(200).json({ data: tenantData, message: 'Data fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateTenant = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tenantId: number = +req.params.id;
      const tenantData: Tenant = req.body;

      const updatedTenantData: Tenant = await this.tenant.updateTenant(tenantId, tenantData);
      res.status(200).json({ data: updatedTenantData, message: 'Data updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTenant = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tenantId: number = +req.params.id;
      const deletedTenantData: Tenant = await this.tenant.deleteTenant(tenantId);

      res.status(200).json({ data: deletedTenantData, message: 'Tenant deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
