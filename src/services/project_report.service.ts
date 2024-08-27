import { EntityRepository, Repository, getConnection } from 'typeorm';
import { ProjectReportEntity } from '@entities/project_report.entity';
import { ProjectReport } from '@interfaces/project_report.interface';
import { HttpException } from '@exceptions/HttpException';
import { generateRandomCode } from '@/helpers/code_generator.helper';
import sendEmail from '@/helpers/postmark_email.helper';

@EntityRepository(ProjectReportEntity)
export class ProjectReportService extends Repository<ProjectReportEntity> {
  public async findAllProjectReports(): Promise<ProjectReport[]> {
    try {
      const allProjectReports = await getConnection().query(
        `SELECT pr.*, concat(st.firstname,' ', st.lastname) as name FROM project_report_entity pr JOIN staff_entity st ON pr."createdBy" = st.userid`,
      );
      return allProjectReports;
    } catch (error) {
      throw error;
    }
  }

  public async findProjectReportById(reportId: number): Promise<ProjectReport | string> {
    try {
      const reportById = await getConnection().query('SELECT * FROM project_report_entity WHERE id = $1', [reportId]);
      const result = reportById.length ? reportById[0] : undefined;
      if (!result) {
        return 'No project report was found with this ID.';
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async createProjectReport(userId: string, reportData: Partial<ProjectReport>): Promise<ProjectReport> {
    try {
      const report_code = await generateRandomCode('project_report_entity', 'report_code', 'pr');
      const connection = getConnection();
      const query = `
        INSERT INTO project_report_entity(report_code, report_type, created_for, project_name, project_code, project_supervisor, report_summary, challenges, solutions, recommendation, weekly_projection, materials_required_for_projection, materials_on_site, status, submitted_by, submitted_on, visitor, weather, photograph_id, "createdBy")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
        RETURNING *
      `;
      const result = await connection.query(query, [
        report_code,
        reportData.report_type,
        reportData.created_for,
        reportData.project_name,
        reportData.project_code,
        reportData.project_supervisor,
        reportData.report_summary,
        reportData.challenges,
        reportData.solutions,
        reportData.recommendation,
        reportData.weekly_projection,
        reportData.materials_required_for_projection,
        reportData.materials_on_site,
        reportData.status,
        reportData.submitted_by,
        reportData.submitted_on,
        reportData.visitor,
        reportData.weather,
        reportData.photograph_id,
        userId,
      ]);
      const staff_name = await getConnection().query("SELECT concat(firstname, ' ', lastname) as name FROM staff_entity WHERE userid = $1", [userId]);
      const user = await getConnection().query("SELECT email FROM users_entity WHERE user_type ILIKE 'admin'");
      const emails = user.map((email) => email.email);
      await sendEmail(emails, 36142495, staff_name[0].name, reportData.project_name);
      return result[0];
    } catch (error) {
      throw error;
    }
  }

  public async updateProjectReport(reportId: number, reportData: Partial<ProjectReport>): Promise<ProjectReport> {
    try {
      const findReport: ProjectReport | undefined = await ProjectReportEntity.findOne({ where: { id: reportId } });
      if (!findReport) throw new HttpException(409, "Project report doesn't exist");

      await ProjectReportEntity.update({ id: reportId }, { ...reportData });

      const updateReport: ProjectReport | undefined = await ProjectReportEntity.findOne({ where: { id: reportId } });
      return updateReport;
    } catch (error) {
      throw error;
    }
  }

  public async uploadProjectReportImages(reportId: number, reportData: Partial<ProjectReport>): Promise<ProjectReport> {
    try {
      const findReport: ProjectReport | undefined = await ProjectReportEntity.findOne({ where: { id: reportId } });
      if (!findReport) throw new HttpException(409, "Project report doesn't exist");

      // Convert the array of URLs to a PostgreSQL array literal
      const imageUrlArray = reportData.photograph_id.map(url => `'${url}'`).join(', ');

      // Use the ARRAY constructor to properly format the array for PostgreSQL
      const query = `
      UPDATE project_report_entity
      SET photograph_id = ARRAY[${imageUrlArray}], "updatedAt" = NOW()
      WHERE id = $1
      RETURNING *;
    `;

      const updatedReport = await getConnection().query(query, [reportId]);

      // Return the updated report
      return updatedReport;
    } catch (error) {
      throw error;
    }
  }

  public async deleteProjectReport(reportId: number): Promise<void> {
    try {
      const findReport: ProjectReport | undefined = await ProjectReportEntity.findOne({ where: { id: reportId } });
      if (!findReport) throw new HttpException(409, "Project report doesn't exist");

      await getConnection().query('DELETE FROM project_report_entity WHERE id = $1', [reportId]);
    } catch (error) {
      throw error;
    }
  }
}
