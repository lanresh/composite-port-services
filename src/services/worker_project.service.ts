import { ProjectWorkerEntity } from '@/entities/project_worker.entity';
import { HttpException } from '@/exceptions/HttpException';
import { ProjectWorker } from '@/interfaces/project_worker.interface';
import { EntityRepository, Repository, getConnection } from 'typeorm';

@EntityRepository(ProjectWorkerEntity)
export class WorkerProjectService extends Repository<ProjectWorkerEntity> {
  public async createWorkerProject(workerProjectData: Partial<ProjectWorker>): Promise<ProjectWorker> {
    const query = `INSERT INTO public.project_worker_entity(project_code, project_name, service_type, worker_code, worker_name)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`;

    const createWorkerProjectData: ProjectWorker = await getConnection().query(query, [
      workerProjectData.project_code,
      workerProjectData.project_name,
      workerProjectData.service_type,
      workerProjectData.worker_code,
      workerProjectData.worker_name,
    ]);

    return createWorkerProjectData[0];
  }

  public async findAllWorkerProjects(): Promise<ProjectWorker[]> {
    return await getConnection().query('SELECT * FROM public.project_worker_entity');
  }

  //   public async findWorkerProjectById(workerProjectId: number): Promise<ProjectWorker> {
  //     const workerProjects: ProjectWorker[] = await getConnection().query('SELECT * FROM public.project_worker_entity WHERE id = $1', [
  //       workerProjectId,
  //     ]);
  //     if (!workerProjects.length) throw new HttpException(409, 'Worker project not found');

  //     return workerProjects[0];
  //   }

  public async findWorkerProjectByProjectCode(projectCode: string): Promise<ProjectWorker[]> {
    const workerProjects: ProjectWorker[] = await getConnection().query(
      'SELECT pw.*, w.id, w.worker_email, worker_home_phone, worker_ofc_phone FROM public.project_worker_entity pw JOIN worker_entity w ON pw.worker_code = w.worker_code WHERE pw.project_code = $1',
      [projectCode],
    );
    return workerProjects;
  }

  public async deleteWorkerProject(workerProjectId: number): Promise<ProjectWorker> {
    const deleteWorkerProject: ProjectWorker[] = await getConnection().query('DELETE FROM public.project_worker_entity WHERE id = $1 RETURNING *', [
      workerProjectId,
    ]);
    if (!deleteWorkerProject.length) throw new HttpException(409, 'Worker project not found');

    return deleteWorkerProject[0];
  }
}
