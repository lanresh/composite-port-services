import { EntityRepository, Repository, getConnection } from 'typeorm';
import { WorkerJobsEntity } from '@entities/worker_jobs.entity';
import { WorkerJobs } from '@interfaces/worker_jobs.interface';
import { HttpException } from '@exceptions/HttpException';

const generateCode = async () => {
    const count = await getConnection().getRepository(WorkerJobsEntity).count();
  
    //generate user id
    const code = 'WJ-' + (count + 1).toString().padStart(4, '0');
    return code;
  };

@EntityRepository(WorkerJobsEntity)
export class WorkerJobsService extends Repository<WorkerJobsEntity> {
  public async findAllWorkerJobs(): Promise<WorkerJobs[]> {
    try {
      const allWorkerJobs = await getConnection().query(`
        SELECT * FROM worker_jobs_entity
      `);
      return allWorkerJobs;
    } catch (error) {
      throw error;
    }
  }

  public async findWorkerJobById(jobId: number): Promise<WorkerJobs | string> {
    try {
      const workerJob = await getConnection().query(
        'SELECT * FROM worker_jobs_entity WHERE id = $1',
        [jobId]
      );
      const result = workerJob.length ? workerJob[0] : undefined;
      if (!result) {
        return "No worker job found with this ID.";
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async createWorkerJob(workerJobData: Partial<WorkerJobs>): Promise<WorkerJobs> {
    try {
      const jobCode = await generateCode();
      const connection = getConnection();
      const query = `
        INSERT INTO worker_jobs_entity(job_code, worker_code, project_code, worker_service, worker_service_charge, amount_paid, outstanding_balance, comment)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `;
      const result = await connection.query(query, [
        jobCode,
        workerJobData.worker_code,
        workerJobData.project_code,
        workerJobData.worker_service,
        workerJobData.worker_service_charge,
        workerJobData.amount_paid,
        workerJobData.outstanding_balance,
        workerJobData.comment,
      ]);
      return result[0];
    } catch (error) {
      throw error;
    }
  }

  public async updateWorkerJob(jobId: number, workerJobData: Partial<WorkerJobs>): Promise<WorkerJobs> {
    try {
      const findJob: WorkerJobs| undefined = await WorkerJobsEntity.findOne({ where: { id: jobId } });
      if (!findJob) throw new HttpException(409,"Worker job doesn't exist");

      await WorkerJobsEntity.update(jobId, { ...workerJobData });

      const updateJob: WorkerJobs | undefined = await WorkerJobsEntity.findOne({ where: { id: jobId } });
      return updateJob;
    } catch (error) {
      throw error;
    }
  }


  public async deleteWorkerJob(jobId: number): Promise<void> {
    try {
      await getConnection().query('DELETE FROM worker_jobs_entity WHERE id = $1', [jobId]);
    } catch (error) {
      throw error;
    }
  }
}
