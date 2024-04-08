import { EntityRepository, Repository, getConnection } from 'typeorm';
import { ClientProjectEntity } from '../entities/client_project.entity';
import { ClientProject } from '../interfaces/client_project.interface';
import { HttpException } from '../exceptions/HttpException';

@EntityRepository(ClientProjectEntity)
export class ClientProjectService extends Repository<ClientProjectEntity> {
  public async createClientProject(clientProjectData: Partial<ClientProject>): Promise<ClientProject> {
    const query = `INSERT INTO public.client_project_entity(
            client_id, project_id, project_code, project_name)
            VALUES ($1, $2, $3, $4) RETURNING *`;

    const createClientProjectData: ClientProject = await getConnection().query(query, [
      clientProjectData.client_id,
      clientProjectData.project_id,
      clientProjectData.project_code,
      clientProjectData.project_name,
    ]);

    return createClientProjectData[0];
  }

  public async findAllClientProjects(): Promise<ClientProject[]> {
    return await getConnection().query('SELECT * FROM public.client_project_entity');
  }

  public async findClientProjectsByClientId(clientId: string): Promise<ClientProject[]> {
    return await getConnection().query('SELECT cpe.*, pe.project_duration, pe.start_date, pe.end_date, pe.status FROM public.client_project_entity cpe JOIN public.project_entity pe ON cpe.project_id::integer = pe.id WHERE cpe.client_id = $1', [clientId]);
  }

  public async findClientProjectsByProjectId(projectId: string): Promise<ClientProject[]> {
    return await getConnection().query('SELECT cpe.*, pe.project_duration, pe.start_date, pe.end_date, pe.status FROM public.client_project_entity cpe JOIN public.project_entity pe ON cpe.project_id::integer = pe.id WHERE cpe.project_id = $1', [projectId]);
  }

  public async findClientProjectsById(id: number): Promise<ClientProject> {
    const clientProject = await getConnection().query('SELECT * FROM public.client_project_entity WHERE id = $1', [id]);
    if (clientProject.length === 0) throw new HttpException(404, 'Client project not found');
    return clientProject[0];
  }

  public async updateClientProject(id: number, clientProjectData: Partial<ClientProject>): Promise<ClientProject> {
    const findClientProject: ClientProject = await ClientProjectEntity.findOne({ where: { id: id } });
    if (!findClientProject) throw new HttpException(404, "Client project doesn't exist");

    await ClientProjectEntity.update({ id: id }, { ...clientProjectData });

    const updateClientProject = await ClientProjectEntity.findOne({ where: { id: id } });
    return updateClientProject;
  }

  public async deleteClientProject(id: number): Promise<ClientProject> {
    const deletedClientProject: ClientProject[] = await getConnection().query('DELETE FROM public.client_project_entity WHERE id = $1 RETURNING *', [
      id,
    ]);
    if (!deletedClientProject.length) throw new HttpException(404, "Client project doesn't exist");

    return deletedClientProject[0];
  }
}
