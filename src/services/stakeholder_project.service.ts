import { EntityRepository, Repository, getConnection } from 'typeorm';
import { StakeholderProjectEntity } from '@entities/stakeholder_project.entity';
import { StakeholderProject } from '@interfaces/stakeholder_project.interface';
import { HttpException } from '@exceptions/HttpException';


const generateCode = async () => {
    const count = await getConnection().getRepository(StakeholderProjectEntity).count();
  
    //generate user id
    const code = 'SHP-' + (count + 1).toString().padStart(4, '0');
    return code;
  };

@EntityRepository(StakeholderProjectEntity)
export class StakeholderProjectService extends Repository<StakeholderProjectEntity> {
  public async findAllStakeholderProjects(): Promise<StakeholderProject[]> {
    try {
      const allStakeholderProjects = await getConnection().query(`
        SELECT * FROM stakeholder_project_entity
      `);
      return allStakeholderProjects;
    } catch (error) {
      throw error;
    }
  }

  public async findStakeholderProjectById(projectId: number): Promise<StakeholderProject | string> {
    try {
      const project = await getConnection().query(
        'SELECT * FROM stakeholder_project_entity WHERE id = $1',
        [projectId]
      );
      const result = project.length ? project[0] : undefined;
      if (!result) {
        return "No stakeholder project found with this ID.";
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async createStakeholderProject(userId: string,projectData: Partial<StakeholderProject>): Promise<StakeholderProject> {
    try {
      const project_code = await generateCode();
      const connection = getConnection();
      const query = `
        INSERT INTO stakeholder_project_entity(stakeholder_code, stakeholder_project_code, stakeholder_amount, approved_amount, other_amount, "createdBy", comment, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `;
      const result = await connection.query(query, [
        projectData.stakeholder_code,
        project_code,
        projectData.stakeholder_amount,
        projectData.approved_amount,
        projectData.other_amount,
        userId,
        projectData.comment,
        projectData.status,
      ]);
      return result[0];
    } catch (error) {
      throw error;
    }
  }


  public async updateStakeholderProject(projectId: number, projectData: Partial<StakeholderProject>): Promise<StakeholderProject> {
    try {
      const findProject: StakeholderProject | undefined = await StakeholderProjectEntity.findOne({ where: { id: projectId } });
      if (!findProject) throw new HttpException(409,"Stakeholder project doesn't exist");

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
