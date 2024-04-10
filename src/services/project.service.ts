import { ProjectEntity } from '@/entities/project.entity';
import { HttpException } from '@/exceptions/HttpException';
import { generateRandomCode } from '@/helpers/code_generator.helper';
import { Project } from '@/interfaces/project.interface';
import { EntityRepository, Repository, getConnection } from 'typeorm';

const duration = (start: string, end: string) => {
  // Parse the date strings into Date objects
  const startDate = new Date(start);
  const endDate = new Date(end);

  // Calculate the difference in milliseconds
  const differenceMs = endDate.getTime() - startDate.getTime();

  // Calculate the difference in days
  const differenceDays = differenceMs / (1000 * 60 * 60 * 24);

  // Convert the difference to a string and return
  return differenceDays.toString();
};

@EntityRepository(ProjectEntity)
export class ProjectService extends Repository<ProjectEntity> {
  public async createProject(userId: string, projectData: Project): Promise<Project> {
    const project_code = await generateRandomCode('project_entity', 'project_code', 'proj');

    const project_duration = duration(projectData.start_date, projectData.end_date);

    const createProjectData: Project = await getConnection().query(
      `INSERT INTO project_entity (project_name, project_description, project_code, project_location, address, city, state, lga, project_duration, start_date, end_date, comment, status, date_added, project_supervisor, supervisor_id, "createdBy")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, now(), $14, $15, $16)
            RETURNING *`,
      [
        projectData.project_name,
        projectData.project_description,
        project_code,
        projectData.project_location,
        projectData.address,
        projectData.city,
        projectData.state,
        projectData.lga,
        project_duration,
        projectData.start_date,
        projectData.end_date,
        projectData.comment,
        projectData.status,
        projectData.project_supervisor,
        projectData.supervisor_id,
        userId,
      ],
    );

    return createProjectData[0];
  }

  public async findAllProject(): Promise<Project[]> {
    const projects: Project[] = await getConnection().query('SELECT * FROM project_entity');

    return projects;
  }

  public async findProjectById(projectId: number): Promise<Project> {
    const findProject = await getConnection().query('SELECT * FROM project_entity WHERE id = $1', [projectId]);
    if (findProject.length === 0) throw new HttpException(404, 'Project not found');

    return findProject[0];
  }

  public async updateProject(projectId: number, projectData: Project): Promise<Project> {
    const findProject: Project = await ProjectEntity.findOne({ where: { id: projectId } });
    if (!findProject) throw new HttpException(404, "Project doesn't exist");

    await ProjectEntity.update(projectId, projectData);

    const updateProject: Project = await ProjectEntity.findOne({ where: { id: projectId } });
    return updateProject;
  }

  public async deleteProject(projectId: number): Promise<Project> {
    const deletedProjectData: Project = await getConnection().query('DELETE FROM project_entity WHERE id = $1 RETURNING *', [projectId]);
    if (!deletedProjectData[0].length) throw new HttpException(404, 'Project not found');

    return deletedProjectData[0];
  }
}
