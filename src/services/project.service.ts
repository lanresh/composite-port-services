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

  public async getProjectSummary(projectCode: string): Promise<Project> {
    const query = `SELECT pe.project_code, 
           sd.startup_cost, 
           shd.stakeholder_amount, 
           cd.contractor_amount, 
           md.material_amount, 
           rd.machinery_approved_amount, 
           rd.labour_approved_amount, 
           rd.cash_advance_approved_amount 
      FROM project_entity pe 
      JOIN (
        SELECT project_code, SUM(startup_cost) AS startup_cost
        FROM startup_cost_entity
        WHERE project_code = $1
        GROUP BY project_code
      ) sd ON pe.project_code = sd.project_code
      JOIN (
        SELECT stakeholder_project_code, SUM(approved_amount) AS stakeholder_amount
        FROM stakeholder_project_entity
        WHERE stakeholder_project_code = $1
        GROUP BY stakeholder_project_code
      ) shd ON pe.project_code = shd.stakeholder_project_code
      JOIN (
        SELECT contractor_project_code, SUM(approved_amount) AS contractor_amount
        FROM contractor_project_entity
        WHERE contractor_project_code = $1
        GROUP BY contractor_project_code
      ) cd ON pe.project_code = cd.contractor_project_code
      JOIN (
        SELECT project_code, SUM(total_price) AS material_amount
        FROM material_entity
        WHERE project_code = $1
        GROUP BY project_code
      ) md ON pe.project_code = md.project_code
      JOIN (
        SELECT project_code, 
               SUM(CASE WHEN request_type in ('Tools and Machine Buy', 'Tools and Machine Store', 'Tools and Machine Rent') THEN approved_amount ELSE 0 END) AS machinery_approved_amount,
               SUM(CASE WHEN request_type = 'labour' THEN approved_amount ELSE 0 END) AS labour_approved_amount,
               SUM(CASE WHEN request_type in ('Cash Advance Office', 'Cash Advance Project') THEN approved_amount ELSE 0 END) AS cash_advance_approved_amount
        FROM request_entity
        WHERE project_code = $1
        GROUP BY project_code
      ) rd ON pe.project_code = rd.project_code
      WHERE pe.project_code = $1`;
    return await getConnection().query(query, [projectCode]);
  }
}
