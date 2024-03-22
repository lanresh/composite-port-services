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
    return await getConnection().query(`SELECT * FROM project_entity WHERE status NOT ILIKE 'completed'`);
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
