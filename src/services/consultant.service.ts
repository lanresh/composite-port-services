import { ConsultantEntity } from '@/entities/consultant.entity';
import { HttpException } from '@/exceptions/HttpException';
import { generateRandomCode } from '@/helpers/code_generator.helper';
import { Consultant } from '@/interfaces/consultant.interface';
import { EntityRepository, Repository, getConnection } from 'typeorm';


@EntityRepository(ConsultantEntity)
export class ConsultantService extends Repository<ConsultantEntity> {
  public async createConsultant(consultantData: Partial<Consultant>): Promise<Consultant> {
    const consultant_code = await generateRandomCode('consultant_entity', 'consultant_code', 'cons');
    const query = `INSERT INTO public.consultant_entity(
            consultant_code, name, type, contact, email, website)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    const createConsultantData: Consultant = await getConnection().query(query, [
      consultant_code,
      consultantData.name,
      consultantData.type,
      consultantData.contact,
      consultantData.email,
      consultantData.website,
    ]);

    return createConsultantData[0];
  }

  public async findAllConsultant(): Promise<Consultant[]> {
    return getConnection().query('SELECT * FROM consultant_entity');
  }

  public async findConsultantById(consultantId: number): Promise<Consultant> {
    const consultant: Consultant[] = await getConnection().query('SELECT * FROM consultant_entity WHERE id = $1', [consultantId]);
    if (!consultant.length) throw new HttpException(409, 'Consultant not found');
    return consultant[0];
  }

  public async updateConsultant(consultantId: number, consultantData: Partial<Consultant>): Promise<Consultant> {
    const findConsultant: Consultant = await ConsultantEntity.findOne({ where: { id: consultantId } });
    if (!findConsultant) throw new HttpException(409, "Consultant doesn't exist");

    await ConsultantEntity.update({ id: consultantId }, consultantData);

    const updateConsultant: Consultant = await ConsultantEntity.findOne({ where: { id: consultantId } });
    return updateConsultant;
  }

  public async deleteConsultant(consultantId: number): Promise<Consultant> {
    const deletedConsultant: Consultant[] = await getConnection().query(`DELETE FROM consultant_entity WHERE id = $1 RETURNING *`, [consultantId]);
    if (!deletedConsultant.length) throw new HttpException(409, "Consultant doesn't exist");
    return deletedConsultant[0];
  }
}
