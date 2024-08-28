import { EntityRepository, Repository, getConnection } from 'typeorm';
import { ContractorProjectEntity } from '../entities/contractor_project.entity';
import { ContractorProject } from '@/interfaces/contractor_project.interface';
import { HttpException } from '@/exceptions/HttpException';
import { sendUserEmail } from '@/helpers/postmark_email.helper';

@EntityRepository(ContractorProjectEntity)
export class ContractorProjectService extends Repository<ContractorProjectEntity> {
  public async createContractorProject(userId: string, contractorProjectData: Partial<ContractorProject>): Promise<ContractorProject> {
    const query = `INSERT INTO public.contractor_project_entity(
            contractor_code, contractor_project_code, contractor_amount, service, "createdBy", comment)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    const createContractorProjectData: ContractorProject = await getConnection().query(query, [
      contractorProjectData.contractor_code,
      contractorProjectData.contractor_project_code,
      contractorProjectData.contractor_amount,
      contractorProjectData.service,
      userId,
      contractorProjectData.comment,
    ]);

    const contractor_name = await getConnection().query(
      `SELECT ce.contractor_name FROM contractor_entity ce WHERE ce.contractor_code = $1`,
      [contractorProjectData.contractor_code],
    );
    const project_name = await getConnection().query(
      `SELECT pe.project_name FROM project_entity pe WHERE pe.project_code = $1`,
      [contractorProjectData.contractor_project_code],
    );

    const body = `A Contractor (${contractor_name[0].contractor_name}) has been added to project ${project_name[0].project_name} and require your approval.`;
    const user = await getConnection().query("SELECT email FROM users_entity WHERE user_type ILIKE 'admin'");
    const emails = user.map((email: { email: string }) => email.email);
    await sendUserEmail(emails, 37108171, body, 'Pending Approval: Contractor Added to Project');

    return createContractorProjectData[0];
  }

  public async findAllContractorProject(): Promise<ContractorProject[]> {
    return getConnection().query(
      `SELECT cp.*, ce.contractor_name, pe.project_name, CONCAT(st.firstname, ' ', st.lastname) as created_by FROM contractor_project_entity cp JOIN staff_entity st ON cp."createdBy" = st.userid JOIN project_entity pe ON cp.contractor_project_code = pe.project_code JOIN contractor_entity ce ON cp.contractor_code = ce.contractor_code`,
    );
  }

  public async findContractorProjectById(contractorProjectId: number): Promise<ContractorProject> {
    const contractorProject: ContractorProject[] = await getConnection().query(
      `SELECT cp.*, ce.contractor_name, pe.project_name, CONCAT(st.firstname, ' ', st.lastname) as created_by FROM contractor_project_entity cp JOIN staff_entity st ON cp."createdBy" = st.userid JOIN project_entity pe ON cp.contractor_project_code = pe.project_code JOIN contractor_entity ce ON cp.contractor_code = ce.contractor_code WHERE cp.id = $1`,
      [contractorProjectId],
    );
    if (!contractorProject.length) throw new HttpException(409, 'Contractor project not found');

    return contractorProject[0];
  }

  public async findContractorProjectsByProjectCode(projectCode: string): Promise<ContractorProject[]> {
    const contractorProject: ContractorProject[] = await getConnection().query(
      `SELECT cp.*, ce.contractor_name, CONCAT(st.firstname, ' ', st.lastname) as created_by FROM contractor_project_entity cp JOIN staff_entity st ON cp."createdBy" = st.userid JOIN contractor_entity ce ON cp.contractor_code = ce.contractor_code WHERE cp.contractor_project_code = $1 AND cp.status ILIKE 'approved'`,
      [projectCode],
    );

    return contractorProject;
  }

  public async findAllContractorProjectByContractorCode(contractorCode: string): Promise<ContractorProject[]> {
    return getConnection().query(
      `SELECT cp.*, pe.project_name, CONCAT(st.firstname, ' ', st.lastname) as created_by FROM public.contractor_project_entity cp JOIN public.staff_entity st ON cp."createdBy" = st.userid JOIN public.project_entity pe ON cp.contractor_project_code = pe.project_code WHERE cp.contractor_code = $1`,
      [contractorCode],
    );
  }

  public async updateContractorProject(contractorProjectId: number, contractorProjectData: Partial<ContractorProject>): Promise<ContractorProject> {
    const findContractorProject: ContractorProject = await ContractorProjectEntity.findOne({ where: { id: contractorProjectId } });
    if (!findContractorProject) throw new HttpException(409, "Contractor project doesn't exist");

    await ContractorProjectEntity.update({ id: contractorProjectId }, contractorProjectData);

    const updateContractorProject: ContractorProject = await ContractorProjectEntity.findOne({ where: { id: contractorProjectId } });
    return updateContractorProject;
  }

  public async deleteContractorProject(contractorProjectId: number): Promise<ContractorProject> {
    const deletedContractorProject: ContractorProject[] = await getConnection().query(
      `DELETE FROM contractor_project_entity WHERE id = $1 RETURNING *`,
      [contractorProjectId],
    );
    if (!deletedContractorProject.length) throw new HttpException(409, "Contractor project doesn't exist");

    return deletedContractorProject[0];
  }
}
