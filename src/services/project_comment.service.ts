import { ProjectCommentEntity } from '@/entities/project_comment.entity';
import { EntityRepository, Repository, getConnection } from 'typeorm';
import { ProjectComment } from '@/interfaces/project_comment.interface';
import { HttpException } from '@/exceptions/HttpException';

@EntityRepository(ProjectCommentEntity)
export class ProjectCommentService extends Repository<ProjectCommentEntity> {
  public async createProjectComment(projectCommentData: ProjectComment): Promise<ProjectComment> {
    const query = `INSERT INTO public.project_comment_entity(
            client_id, project_code, comment_code, sender_name, comment_title, comment, status)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

    const createProjectCommentData: ProjectCommentEntity[] = await getConnection().query(query, [
      projectCommentData.client_id,
      projectCommentData.project_code,
      projectCommentData.comment_code,
      projectCommentData.sender_name,
      projectCommentData.comment_title,
      projectCommentData.comment,
      projectCommentData.status,
    ]);

    return createProjectCommentData[0];
  }

  public async findAllProjectComment(): Promise<ProjectComment[]> {
    const projectComment: ProjectComment[] = await getConnection().query(`SELECT * FROM project_comment_entity`);
    return projectComment;
  }

  public async findProjectCommentByProjectCode(projectCode: string): Promise<ProjectComment[]> {
    return await getConnection().query(`SELECT * FROM project_comment_entity WHERE project_code = $1`, [projectCode]);
  }

  public async findProjectCommentByClientId(clientId: string): Promise<ProjectComment[]> {
    return await getConnection().query(`SELECT * FROM project_comment_entity WHERE client_id = $1`, [clientId]);
  }
}
