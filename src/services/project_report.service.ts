import { EntityRepository, Repository, getConnection } from 'typeorm';
import { ProjectReportEntity } from '@entities/project_report.entity';
import { ProjectReport } from '@interfaces/project_report.interface';

@EntityRepository(ProjectReportEntity)
export class ProjectReportService extends Repository<ProjectReportEntity> {
  public async findAllProjectReports(): Promise<ProjectReport[]> {
    try {
      const allProjectReports = await getConnection().query(`SELECT pr.*, concat(st.firstname,' ', st.lastname) as name FROM project_report_entity pr JOIN staff_entity st ON pr."createdBy" = st.userid`);
      return allProjectReports;
    } catch (error) {
      throw error;
    }
  }

  public async findProjectReportById(reportId: number): Promise<ProjectReport | string> {
    try {
      const reportById = await getConnection().query(
        'SELECT * FROM project_report_entity WHERE id = $1',
        [reportId]
      );
      const result = reportById.length ? reportById[0] : undefined;
      if (!result) {
        return "No project report was found with this ID.";
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async createProjectReport(userId: string, reportData: Partial<ProjectReport>): Promise<ProjectReport> {
    try {
      const connection = getConnection();
      const query = `
        INSERT INTO project_report_entity(report_code, report_type, created_for, project_name, project_code, project_supervisor, report_summary, challenges, solutions, recommendation, weekly_projection, materials_required_for_projection, materials_on_site, status, submitted_by, submitted_on, visitor, weather, photograph_id, "createdBy")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
        RETURNING *
      `;
      const result = await connection.query(query, [
        reportData.report_code,
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
      return result[0];
    } catch (error) {
      throw error;
    }
  }

  public async updateProjectReport(reportId: number, reportData: Partial<ProjectReport>): Promise<ProjectReport> {
    try {
      const findReport: ProjectReport = await ProjectReportEntity.findOne({ where: { id: reportId } });
      if (!findReport) throw new Error("Project report doesn't exist");

      await ProjectReportEntity.update(reportId, { ...reportData });

      const updateReport: ProjectReport = await ProjectReportEntity.findOne({ where: { id: reportId } });
      return updateReport;
    } catch (error) {
      throw error;
    }
  }

  public async deleteProjectReport(reportId: number): Promise<void> {
    try {
      const findReport: ProjectReport = await ProjectReportEntity.findOne({ where: { id: reportId } });
      if (!findReport) throw new Error("Project report doesn't exist");

      await getConnection().query('DELETE FROM project_report_entity WHERE id = $1', [reportId]);
    } catch (error) {
      throw error;
    }
  }
}
