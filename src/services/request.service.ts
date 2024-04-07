import { RequestEntity } from '@/entities/request.entity';
import { HttpException } from '@/exceptions/HttpException';
import { Request } from '@/interfaces/request.interface';
import { EntityRepository, getConnection, Repository } from 'typeorm';

export const generateRequestCode = async (): Promise<string> => {
  const count = await getConnection().getRepository(RequestEntity).count();
  //generate user id
  const request_code = 'req-' + (count + 1).toString().padStart(4, '0');
  return request_code;
};

@EntityRepository(RequestEntity)
export class RequestService extends Repository<RequestEntity> {
  public async createRequest(requestData: Request): Promise<Request> {
    const request_code: string = await generateRequestCode();
    const query = `INSERT INTO public.request_entity(
            request_code, carttemp_sess, staff_id, staff_name, staff_email, request_type, project_name, project_code, supplier_code, supplier_name, supplier_material, 
            description, quantity, unit_price, total_price, worker_name, worker_code, worker_service, amount, job_code, comment, response, status, date, company, 
            company_address, contact_person, contact_mobile, ofc_phone, cash_advance_purpose, tool_name, approved_by, approved_on, approved_amount, approved_quantity, 
            approved_unit_price, approved_total_amount, tool_machinery_type, inventory_type_id, supervisor_comment)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40) RETURNING *`;
    const createRequestData: Request = await getConnection().query(query, [
      request_code,
      requestData.carttemp_sess,
      requestData.staff_id,
      requestData.staff_name,
      requestData.staff_email,
      requestData.request_type,
      requestData.project_name,
      requestData.project_code,
      requestData.supplier_code,
      requestData.supplier_name,
      requestData.supplier_material,
      requestData.description,
      requestData.quantity || 0,
      requestData.unit_price || 0,
      requestData.quantity * requestData.unit_price || 0,
      requestData.worker_name,
      requestData.worker_code,
      requestData.worker_service,
      requestData.amount || 0,
      requestData.job_code,
      requestData.comment,
      requestData.response,
      requestData.status,
      requestData.date,
      requestData.company,
      requestData.company_address,
      requestData.contact_person,
      requestData.contact_mobile,
      requestData.ofc_phone,
      requestData.cash_advance_purpose,
      requestData.tool_name,
      requestData.approved_by,
      requestData.approved_on,
      requestData.approved_amount || 0,
      requestData.approved_quantity || 0,
      requestData.approved_unit_price || 0,
      requestData.approved_quantity * requestData.approved_unit_price || 0,
      requestData.tool_machinery_type,
      requestData.inventory_type_id,
      requestData.supervisor_comment,
    ]);

    return createRequestData[0];
  }

  public async findAllRequests(): Promise<Request[]> {
    return await getConnection().query('SELECT * FROM request_entity');
  }

  public async findRequestById(requestId: number): Promise<Request> {
    const requests: Request[] = await getConnection().query('SELECT * FROM request_entity WHERE id = $1', [requestId]);
    if (!requests.length) throw new HttpException(409, "Request doesn't exist");

    return requests[0];
  }

  public async findRequestsByUser(userId: string): Promise<Request[]> {
    return await getConnection().query('SELECT * FROM request_entity WHERE staff_id = $1', [userId]);
  }

  public async updateRequest(requestId: number, requestData: Request): Promise<Request> {
    const findRequest: Request = await RequestEntity.findOne({ where: { id: requestId } });
    if (!findRequest) throw new HttpException(409, "Request doesn't exist");

    await RequestEntity.update({ id: requestId }, requestData);
    const updatedRequest: Request = await RequestEntity.findOne({ where: { id: requestId } });
    return updatedRequest;
  }

  public async deleteRequest(requestId: number): Promise<Request> {
    const deletedRequest: Request[] = await getConnection().query(`DELETE FROM request_entity WHERE id = $1 RETURNING *`, [requestId]);
    if (!deletedRequest.length) throw new HttpException(409, "Request doesn't exist");
    return deletedRequest[0];
  }
}
