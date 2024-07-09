import { EntityRepository, getConnection, Repository } from 'typeorm';
import { ProjectFlatsEntity } from '../entities/project_flats.entity';
import { HttpException } from '@/exceptions/HttpException';
import { ProjectFlats } from '@/interfaces/project_flats.interface';
import { generateRandomCode } from '@/helpers/code_generator.helper';

@EntityRepository(ProjectFlatsEntity)
export class ProjectFlatService extends Repository<ProjectFlatsEntity> {
  public async createProjectFlat(projectFlatData: ProjectFlats): Promise<ProjectFlats> {
    const project_flat_code = await generateRandomCode('project_flats_entity', 'flat_code', 'pf');
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
    const projectFlats: ProjectFlats[] = await getConnection().query('SELECT * FROM public.project_flats_entity WHERE flat_id = $1', [projectFlatId]);
    if (!projectFlats.length) throw new HttpException(409, 'Project flat not found');

    return projectFlats[0];
  }

  public async findProjectFlatByProjectCode(projectCode: string): Promise<ProjectFlats[]> {
    const projectFlats: ProjectFlats[] = await getConnection().query(
      'SELECT * FROM public.project_flats_entity WHERE project_code = $1',
      [projectCode],
    );

    return projectFlats;
  }

  public async updateProjectFlat(projectFlatId: number, projectFlatData: ProjectFlats): Promise<ProjectFlats> {
    const projectFlat: ProjectFlatsEntity = await ProjectFlatsEntity.findOne({ where: { flat_id: projectFlatId } });
    if (!projectFlat) throw new HttpException(409, 'Project flat not found');

    // Set the default value for the status field if it's not included in projectFlatData
    const updatedProjectFlatData: ProjectFlats = { ...projectFlatData };
    if (!updatedProjectFlatData.status) {
      updatedProjectFlatData.status = projectFlat.status; // Use the existing status value as the default
    }
    if (!updatedProjectFlatData.project_name) {
      updatedProjectFlatData.project_name = projectFlat.project_name;
    }
    if (!updatedProjectFlatData.project_code) {
      updatedProjectFlatData.project_code = projectFlat.project_code;
    }
    if (!updatedProjectFlatData.flat_desc) {
      updatedProjectFlatData.flat_desc = projectFlat.flat_desc;
    }
    if (!updatedProjectFlatData.comment) {
      updatedProjectFlatData.comment = projectFlat.comment;
    }

    await ProjectFlatsEntity.update({ flat_id: projectFlatId }, updatedProjectFlatData);
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
