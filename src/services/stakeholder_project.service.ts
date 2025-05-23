import { EntityRepository, Repository, getConnection } from 'typeorm';
import { StakeholderProjectEntity } from '@entities/stakeholder_project.entity';
import { StakeholderProject } from '@interfaces/stakeholder_project.interface';
import { HttpException } from '@exceptions/HttpException';
import { generateRandomCode } from '@/helpers/code_generator.helper';
import { sendUserEmail } from '@/helpers/postmark_email.helper';

@EntityRepository(StakeholderProjectEntity)
export class StakeholderProjectService extends Repository<StakeholderProjectEntity> {
  public async findAllStakeholderProjects(): Promise<StakeholderProject[]> {
    try {
      const allStakeholderProjects = await getConnection().query(`
        SELECT spe.*, se.stakeholder_name, pe.project_name FROM stakeholder_project_entity spe JOIN project_entity pe ON spe.stakeholder_project_code = pe.project_code JOIN stakeholder_entity se ON spe.stakeholder_code = se.stakeholder_code
      `);
      return allStakeholderProjects;
    } catch (error) {
      throw error;
    }
  }

  public async findStakeholderProjectById(projectId: number): Promise<StakeholderProject | string> {
    try {
      const project = await getConnection().query('SELECT spe.*, se.stakeholder_name, pe.project_name FROM stakeholder_project_entity spe JOIN project_entity pe ON spe.stakeholder_project_code = pe.project_code JOIN stakeholder_entity se ON spe.stakeholder_code = se.stakeholder_code WHERE spe.id = $1', [projectId]);
      const result = project.length ? project[0] : undefined;
      if (!result) {
        return 'No stakeholder project found with this ID.';
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async findStakeholderProjectByCode(projectCode: string): Promise<StakeholderProject[] | string> {
    return await getConnection().query(
      `SELECT sp.*, se.stakeholder_name, CONCAT(st.firstname, ' ', st.lastname) as created_by FROM stakeholder_project_entity sp JOIN staff_entity st ON sp."createdBy" = st.userid JOIN stakeholder_entity se ON sp.stakeholder_code = se.stakeholder_code WHERE sp.stakeholder_project_code = $1 AND sp.status ILIKE 'approved'`,
      [projectCode],
    );
  }

  public async findStakeholderProjectsByStakeholderCode(stakeholderCode: string): Promise<StakeholderProject[]> {
    return await getConnection().query(
      `SELECT sp.*, se.stakeholder_name, pe.project_name, CONCAT(st.firstname, ' ', st.lastname) as created_by FROM stakeholder_project_entity sp JOIN staff_entity st ON sp."createdBy" = st.userid JOIN stakeholder_entity se ON sp.stakeholder_code = se.stakeholder_code JOIN project_entity pe ON sp.stakeholder_project_code = pe.project_code WHERE sp.stakeholder_code = $1`,
      [stakeholderCode],
    );
  }

  public async createStakeholderProject(userId: string, projectData: Partial<StakeholderProject>): Promise<StakeholderProject> {
    try {
      const connection = getConnection();
      const query = `
        INSERT INTO stakeholder_project_entity(stakeholder_code, stakeholder_project_code, stakeholder_amount, approved_amount, other_amount, "createdBy", comment, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `;
      const result = await connection.query(query, [
        projectData.stakeholder_code,
        projectData.stakeholder_project_code,
        projectData.stakeholder_amount,
        projectData.approved_amount,
        projectData.other_amount,
        userId,
        projectData.comment,
        projectData.status,
      ]);

      const stakeholder_name = await getConnection().query(
        `SELECT stakeholder_name FROM stakeholder_entity WHERE stakeholder_code = $1`,
        [projectData.stakeholder_code],
      );
      const project_name = await getConnection().query(
        `SELECT pe.project_name FROM project_entity pe WHERE pe.project_code = $1`,
        [projectData.stakeholder_project_code],
      );
  
      const body = `A Stakeholder (${stakeholder_name[0].stakeholder_name}) has been added to project ${project_name[0].project_name} and require your approval.`;
      const user = await getConnection().query("SELECT email FROM users_entity WHERE user_type ILIKE 'admin'");
      const emails = user.map((email: { email: string }) => email.email);
      await sendUserEmail(emails, 37108171, body, 'Pending Approval: Stakeholder Added to Project');
      return result[0];
    } catch (error) {
      throw error;
    }
  }

  public async updateStakeholderProject(projectId: number, projectData: Partial<StakeholderProject>): Promise<StakeholderProject> {
    try {
      const findProject: StakeholderProject | undefined = await StakeholderProjectEntity.findOne({ where: { id: projectId } });
      if (!findProject) throw new HttpException(409, "Stakeholder project doesn't exist");

      await StakeholderProjectEntity.update(projectId, { ...projectData });

      const updateProject: StakeholderProject | undefined = await StakeholderProjectEntity.findOne({ where: { id: projectId } });
      return updateProject;
    } catch (error) {
      throw error;
    }
  }

  public async deleteStakeholderProject(projectId: number): Promise<void> {
    try {
      await getConnection().query('DELETE FROM stakeholder_project_entity WHERE id = $1', [projectId]);
    } catch (error) {
      throw error;
    }
  }
}
