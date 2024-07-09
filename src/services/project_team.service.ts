import { EntityRepository, Repository, getConnection } from 'typeorm';
import { ProjectTeamEntity } from '../entities/project_team.entity';
import { ProjectTeam } from '../interfaces/project_team.interface';
import { HttpException } from '../exceptions/HttpException';

@EntityRepository(ProjectTeamEntity)
export class ProjectTeamService extends Repository<ProjectTeamEntity> {
  public async createProjectTeam(projectTeamData: ProjectTeam): Promise<ProjectTeam> {
    const query = `INSERT INTO public.project_team_entity(
            project_name, project_code, role, staff_id, staff_name)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`;

    const createProjectTeamData: ProjectTeamEntity[] = await getConnection().query(query, [
      projectTeamData.project_name,
      projectTeamData.project_code,
      projectTeamData.role,
      projectTeamData.staff_id,
      projectTeamData.staff_name,
    ]);

    return createProjectTeamData[0];
  }

  public async findAllProjectTeam(): Promise<ProjectTeam[]> {
    const projectTeam: ProjectTeam[] = await getConnection().query(
      `SELECT pt.*, pe.status, se.image FROM project_team_entity pt JOIN project_entity pe ON pt.project_code = pe.project_code JOIN staff_entity se ON pt.staff_id = se.userid`,
    );
    return projectTeam;
  }

  public async findProjectTeamByProjectCode(projectCode: string): Promise<ProjectTeam[]> {
    return await getConnection().query(
      `SELECT pt.*, pe.status, se.image FROM project_team_entity pt JOIN project_entity pe ON pt.project_code = pe.project_code JOIN staff_entity se ON pt.staff_id = se.userid WHERE pt.project_code = $1`,
      [projectCode],
    );
  }

  public async deleteProjectTeamMember(projectCode: string, staffId: string): Promise<ProjectTeam> {
    const deletedProjectTeam: ProjectTeam[] = await getConnection().query(
      `DELETE FROM project_team_entity WHERE project_code = $1 AND staff_id = $2 RETURNING *`,
      [projectCode, staffId],
    );
    if (!deletedProjectTeam.length) throw new HttpException(409, "Project team member doesn't exist");
    return deletedProjectTeam[0];
  }
}
