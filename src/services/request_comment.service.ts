import { RequestCommentEntity } from '@/entities/request_comment.entity';
import { RequestComment } from '@/interfaces/request_comment.interface';
import { EntityRepository, Repository, getConnection } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';

@EntityRepository(RequestCommentEntity)
export class RequestCommentService extends Repository<RequestCommentEntity> {
  public async createRequestComment(userId: string, requestCommentData: RequestComment): Promise<RequestComment> {
    const query = `INSERT INTO public.request_comment_entity(
            request_code, user_id, comment) VALUES ($1, $2, $3) RETURNING *`;

    const createRequestCommentData: RequestComment = await getConnection().query(query, [
      requestCommentData.request_code,
      userId,
      requestCommentData.comment,
    ]);

    return createRequestCommentData[0];
  }

  public async getAllRequestComments(): Promise<RequestComment[]> {
    return await getConnection().query(
      `SELECT rc.*, CONCAT(st.firstname,' ', st.lastname) as added_by FROM public.request_comment_entity rc JOIN staff_entity st ON rc.user_id = st.userid`,
    );
  }

  public async getRequestCommentsByRequestCode(requestCode: string): Promise<RequestComment[]> {
    return await getConnection().query(
      `SELECT rc.*, CONCAT(st.firstname,' ', st.lastname) as added_by FROM public.request_comment_entity rc JOIN staff_entity st ON rc.user_id = st.userid WHERE request_code = $1`,
      [requestCode],
    );
  }

  public async updateRequestComment(id: number, requestCommentData: RequestComment): Promise<RequestComment> {
    const requestComment: RequestComment = await RequestCommentEntity.findOne({ where: { id: id } });
    if (!requestComment) throw new HttpException(409, 'Request comment not found');

    await RequestCommentEntity.update({ id: id }, requestCommentData);
    const updatedRequestComment: RequestComment = await RequestCommentEntity.findOne({ where: { id: id } });
    return updatedRequestComment;
  }

  public async deleteRequestComment(id: number): Promise<RequestComment> {
    const requestComment: RequestComment[] = await getConnection().query(`DELETE FROM public.request_comment_entity WHERE id = $1 RETURNING *`, [id]);
    if (!requestComment.length) throw new HttpException(409, 'Request comment not found');

    return requestComment[0];
  }
}
