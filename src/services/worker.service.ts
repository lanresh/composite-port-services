import { EntityRepository, Repository, getConnection } from 'typeorm';
import { WorkerEntity } from '@entities/worker.entity';
import { Worker } from '@interfaces/worker.interface';
import { HttpException } from '@exceptions/HttpException';
import { generateRandomCode } from '@/helpers/code_generator.helper';

@EntityRepository(WorkerEntity)
export class WorkerService extends Repository<WorkerEntity> {
  public async findAllWorkers(): Promise<Worker[]> {
    try {
      const allWorkers = await getConnection().query(`
        SELECT * FROM worker_entity
      `);
      return allWorkers;
    } catch (error) {
      throw error;
    }
  }

  public async findWorkerById(workerId: number): Promise<Worker | string> {
    try {
      const worker = await getConnection().query(
        'SELECT * FROM worker_entity WHERE id = $1',
        [workerId]
      );
      const result = worker.length ? worker[0] : undefined;
      if (!result) {
        return "No worker found with this ID.";
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async createWorker(workerData: Partial<Worker>): Promise<Worker> {
    try {
      const workerCode = await generateRandomCode('worker_entity', 'worker_code', 'wkr');
      const connection = getConnection();
      const query = `
        INSERT INTO worker_entity(worker_code, worker_name, worker_company, worker_address, worker_email, worker_mobile, worker_home_phone, worker_ofc_phone, service_type, section, worker_source, site_management, project_code, worker_service, worker_service_charge, amount_paid, outstanding_balance, date_assigned_to_project, comment, bank_name, account_name, account_number)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
        RETURNING *
      `;
      const result = await connection.query(query, [
        workerCode,
        workerData.worker_name,
        workerData.worker_company,
        workerData.worker_address,
        workerData.worker_email,
        workerData.worker_mobile,
        workerData.worker_home_phone,
        workerData.worker_ofc_phone,
        workerData.service_type,
        workerData.section,
        workerData.worker_source,
        workerData.site_management,
        workerData.project_code,
        workerData.worker_service,
        workerData.worker_service_charge,
        workerData.amount_paid,
        workerData.outstanding_balance,
        workerData.date_assigned_to_project,
        workerData.comment,
        workerData.bank_name,
        workerData.account_name,
        workerData.account_number,
      ]);
      return result[0];
    } catch (error) {
      throw error;
    }
  }

  public async updateWorker(workerId: number, workerData: Partial<Worker>): Promise<Worker> {
    try {
      const findWorker: Worker| undefined = await WorkerEntity.findOne({ where: { id: workerId } });
      if (!findWorker) throw new HttpException(409,"Worker doesn't exist");

      await WorkerEntity.update(workerId, { ...workerData });

      const updateWorker: Worker | undefined = await WorkerEntity.findOne({ where: { id: workerId } });
      return updateWorker;
    } catch (error) {
      throw error;
    }
  }

  public async deleteWorker(workerId: number): Promise<void> {
    try {
      await getConnection().query('DELETE FROM worker_entity WHERE id = $1', [workerId]);
    } catch (error) {
      throw error;
    }
  }
}
