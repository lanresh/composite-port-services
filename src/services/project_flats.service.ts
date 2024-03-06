import { EntityRepository, getConnection, Repository } from 'typeorm';
import { ProjectFlatsEntity } from '../entities/project_flats.entity';
import { HttpException } from '@/exceptions/HttpException';
import { ProjectFlats } from '@/interfaces/project_flats.interface';

const generateProjectFlatCode = async (): Promise<string> => {
  const count = await getConnection().getRepository(ProjectFlatsEntity).count();
  //generate startup code
  return `pf-${(count + 1).toString().padStart(4, '0')}`;
};

@EntityRepository(ProjectFlatsEntity)
export class ProjectFlatService extends Repository<ProjectFlatsEntity> {
  public async createProjectFlat(projectFlatData: ProjectFlats): Promise<ProjectFlats> {
    const project_flat_code = await generateProjectFlatCode();
    const query = `INSERT INTO public.project_flats_entity(
            flat_code, project_name, project_code, flat_desc, comment, status)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    const createProjectFlatData: ProjectFlatsEntity[] = await getConnection().query(query, [
      project_flat_code,
      projectFlatData.project_name,
      projectFlatData.project_code,
      projectFlatData.flat_desc,
      projectFlatData.comment,
      projectFlatData.status,
    ]);

    return createProjectFlatData[0];
  }

  public async findAllProjectFlats(): Promise<ProjectFlats[]> {
    return await getConnection().query('SELECT * FROM public.project_flats_entity');
  }

  public async findProjectFlatById(projectFlatId: number): Promise<ProjectFlats> {
    const projectFlats: ProjectFlats[] = await getConnection().query('SELECT * FROM public.project_flats_entity WHERE flat_id = $1', [
      projectFlatId,
    ]);
    if (!projectFlats.length) throw new HttpException(409, 'Project flat not found');

    return projectFlats[0];
  }

  public async findProjectFlatByProjectCode(projectCode: string): Promise<ProjectFlats[]> {
    const projectFlats: ProjectFlats[] = await getConnection().query(
      'SELECT flat_id, flat_code, flat_desc FROM public.project_flats_entity WHERE project_code = $1',
      [projectCode],
    );

    return projectFlats;
  }

  public async updateProjectFlat(projectFlatId: number, projectFlatData: ProjectFlats): Promise<ProjectFlats> {
    const projectFlat: ProjectFlatsEntity = await ProjectFlatsEntity.findOne({ where: { flat_id: projectFlatId } });
    if (!projectFlat) throw new HttpException(409, 'Project flat not found');

    await ProjectFlatsEntity.update({ flat_id: projectFlatId }, projectFlatData);
    const updatedProjectFlat: ProjectFlatsEntity = await ProjectFlatsEntity.findOne({ where: { flat_id: projectFlatId } });
    return updatedProjectFlat;
  }

  public async deleteProjectFlat(projectFlatId: number): Promise<ProjectFlats> {
    const projectFlat: ProjectFlatsEntity[] = await getConnection().query('DELETE FROM public.project_flats_entity WHERE flat_id = $1 RETURNING *', [
      projectFlatId,
    ]);
    if (!projectFlat.length) throw new HttpException(409, 'Project flat not found');
    return projectFlat[0];
  }
}
