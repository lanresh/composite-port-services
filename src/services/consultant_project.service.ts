import { ConsultantProjectEntity } from '@/entities/consultant_project.entity';
import { HttpException } from '@/exceptions/HttpException';
import { ConsultantProject } from '@/interfaces/consultant_project.interface';
import { EntityRepository, Repository, getConnection } from 'typeorm';

@EntityRepository(ConsultantProjectEntity)
export class ConsultantProjectService extends Repository<ConsultantProjectEntity> {
  public async createConsultantProject(consultantProjectData: Partial<ConsultantProject>): Promise<ConsultantProject> {
    const query = `INSERT INTO public.consultant_project_entity(
            consultant_id, project_id, project_code, project_name)
            VALUES ($1, $2, $3, $4) RETURNING *`;

    const createConsultantProjectData: ConsultantProject = await getConnection().query(query, [
      consultantProjectData.consultant_id,
      consultantProjectData.project_id,
      consultantProjectData.project_code,
      consultantProjectData.project_name,
    ]);

    return createConsultantProjectData[0];
  }

  public async findAllConsultantProject(): Promise<ConsultantProject[]> {
    return getConnection().query('SELECT * FROM public.consultant_project_entity');
  }

  public async findConsultantProjectById(consultantProjectId: number): Promise<ConsultantProject> {
    const consultantProject: ConsultantProject[] = await getConnection().query('SELECT * FROM public.consultant_project_entity WHERE id = $1', [
      consultantProjectId,
    ]);
    if (!consultantProject.length) throw new HttpException(409, 'Consultant Project not found');
    return consultantProject[0];
  }

  public async findAllConsultantProjectByConsultantId(consultantId: string): Promise<ConsultantProject[]> {
    return getConnection().query('SELECT * FROM public.consultant_project_entity WHERE consultant_id = $1', [consultantId]);
  }

  public async findAllConsultantProjectByProjectCode(projectCode: string): Promise<ConsultantProject[]> {
    return getConnection().query('SELECT cp.*, ce.name FROM public.consultant_project_entity cp JOIN public.consultant_entity ce ON cp.consultant_id = ce.consultant_code WHERE cp.project_code = $1', [projectCode]);
  }

  public async updateConsultantProject(consultantProjectId: number, consultantProjectData: Partial<ConsultantProject>): Promise<ConsultantProject> {
    const findConsultantProject: ConsultantProject = await ConsultantProjectEntity.findOne({ where: { id: consultantProjectId } });
    if (!findConsultantProject) throw new HttpException(409, "Consultant Project doesn't exist");

    await ConsultantProjectEntity.update({ id: consultantProjectId }, consultantProjectData);
    const updateConsultantProject: ConsultantProject = await ConsultantProjectEntity.findOne({ where: { id: consultantProjectId } });
    return updateConsultantProject;
  }

  public async deleteConsultantProject(consultantProjectId: number): Promise<ConsultantProject> {
    const deletedConsultantProject: ConsultantProject[] = await getConnection().query(
      `DELETE FROM public.consultant_project_entity WHERE id = $1 RETURNING *`,
      [consultantProjectId],
    );
    if (!deletedConsultantProject.length) throw new HttpException(409, "Consultant Project doesn't exist");
    return deletedConsultantProject[0];
  }
}
