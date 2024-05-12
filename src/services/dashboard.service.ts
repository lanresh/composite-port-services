import { Project } from '@/interfaces/project.interface';
import { Request } from '@/interfaces/request.interface';
import { Staff } from '@/interfaces/staff.interface';
import { Worker } from '@/interfaces/worker.interface';
import { EntityRepository, getConnection } from 'typeorm';

@EntityRepository()
export class DashboardService {
  public async entityCount(): Promise<{}> {
    const projectCount: number = await getConnection().query(`SELECT COUNT(*) FROM project_entity`);
    const contractorCount: number = await getConnection().query(`SELECT COUNT(*) FROM contractor_entity`);
    const stakeholderCount: number = await getConnection().query(`SELECT COUNT(*) FROM stakeholder_entity`);
    const staffCount: number = await getConnection().query(`SELECT COUNT(*) FROM staff_entity`);
    const workerCount: number = await getConnection().query(`SELECT COUNT(*) FROM worker_entity`);
    const clientCount: number = await getConnection().query(`SELECT COUNT(*) FROM client_entity`);
    const supplierCount: number = await getConnection().query(`SELECT COUNT(*) FROM supplier_entity`);

    return {
      totalProject: projectCount[0],
      totalContractor: contractorCount[0],
      totalStakeholder: stakeholderCount[0],
      totalStaff: staffCount[0],
      totalWorker: workerCount[0],
      totalClient: clientCount[0],
      totalSuppliers: supplierCount[0],
    };
  }

  public async findAllPendingProjects(): Promise<Project[]> {
    // return await getConnection().query(`SELECT * FROM project_entity WHERE status NOT ILIKE 'completed'`);
    return await getConnection().query(`SELECT pe.project_code, 
       sd.startup_cost, 
       shd.stakeholder_amount, 
       cd.contractor_amount, 
       md.material_amount, 
       rd.machinery_approved_amount, 
       rd.labour_approved_amount, 
       rd.cash_advance_approved_amount 
  FROM project_entity pe 
  LEFT JOIN (
    SELECT project_code, SUM(startup_cost) AS startup_cost
    FROM startup_cost_entity
    GROUP BY project_code
  ) sd ON pe.project_code = sd.project_code
  LEFT JOIN (
    SELECT stakeholder_project_code, SUM(approved_amount) AS stakeholder_amount
    FROM stakeholder_project_entity
    GROUP BY stakeholder_project_code
  ) shd ON pe.project_code = shd.stakeholder_project_code
  LEFT JOIN (
    SELECT contractor_project_code, SUM(approved_amount) AS contractor_amount
    FROM contractor_project_entity
    GROUP BY contractor_project_code
  ) cd ON pe.project_code = cd.contractor_project_code
  LEFT JOIN (
    SELECT project_code, SUM(total_price) AS material_amount
    FROM material_entity
    GROUP BY project_code
  ) md ON pe.project_code = md.project_code
  LEFT JOIN (
    SELECT project_code, 
           SUM(CASE WHEN request_type in ('Tools and Machine Buy', 'Tools and Machine Store', 'Tools and Machine Rent') THEN approved_amount ELSE 0 END) AS machinery_approved_amount,
           SUM(CASE WHEN request_type = 'labour' THEN approved_amount ELSE 0 END) AS labour_approved_amount,
           SUM(CASE WHEN request_type in ('Cash Advance Office', 'Cash Advance Project') THEN approved_amount ELSE 0 END) AS cash_advance_approved_amount
    FROM request_entity
    GROUP BY project_code
  ) rd ON pe.project_code = rd.project_code;
  WHERE pe.status NOT ILIKE 'completed'`);
  }

  public async findAllPendingRequest(): Promise<Request[]> {
    return await getConnection().query(`SELECT * FROM request_entity WHERE status ILIKE 'recommended'`);
  }

  public async findAllStaffAndWorkerCountPerMonth(): Promise<{}> {
    const staffCount: Staff[] = await getConnection().query(`SELECT TO_CHAR("createdAt", 'Month') AS month, COUNT(*) AS staff_count FROM staff_entity GROUP BY month`);
    const workerCount: Worker[] = await getConnection().query(`SELECT TO_CHAR("createdAt", 'Month') AS month, COUNT(*) AS worker_count FROM worker_entity GROUP BY month`);

    return { staffCount, workerCount };
  }
}
