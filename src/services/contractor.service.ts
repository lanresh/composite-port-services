import { ContractorEntity } from '@/entities/contractor.entity';
import { HttpException } from '@/exceptions/HttpException';
import { Contractor } from '@/interfaces/contractor.interface';
import { EntityRepository, Repository, getConnection } from 'typeorm';

const generateCode = async () => {
  const count = await getConnection().getRepository(ContractorEntity).count();

  //generate contractor code
  const code = 'con-' + (count + 1).toString().padStart(4, '0');
  return code;
};

@EntityRepository(ContractorEntity)
export class ContractorService extends Repository<ContractorEntity> {
  public async createContractor(contractorData: Partial<Contractor>): Promise<Contractor> {
    const contractor_code = await generateCode();
    const query = `INSERT INTO public.contractor_entity(
            contractor_code, contractor_name, contractor_service, contractor_address, contractor_ofc_phone, contact_person, contact_mobile, contact_home_phone, email, website, comment)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;

    const createContractorData: Contractor = await getConnection().query(query, [
      contractor_code,
      contractorData.contractor_name,
      contractorData.contractor_service,
      contractorData.contractor_address,
      contractorData.contractor_ofc_phone,
      contractorData.contact_person,
      contractorData.contact_mobile,
      contractorData.contact_home_phone,
      contractorData.email,
      contractorData.website,
      contractorData.comment,
    ]);

    return createContractorData[0];
  }

  public async findAllContractor(): Promise<Contractor[]> {
    return getConnection().query('SELECT * FROM contractor_entity');
  }

  public async findContractorById(contractorId: number): Promise<Contractor> {
    const contractor: Contractor[] = await getConnection().query('SELECT * FROM contractor_entity WHERE contractor_id = $1', [contractorId]);
    if (!contractor.length) throw new HttpException(409, 'Contractor not found');
    return contractor[0];
  }

  public async updateContractor(contractorId: number, contractorData: Partial<Contractor>): Promise<Contractor> {
    const findContractor: Contractor = await ContractorEntity.findOne({ where: { id: contractorId } });
    if (!findContractor) throw new HttpException(409, "Contractor doesn't exist");

    await ContractorEntity.update({ id: contractorId }, contractorData);

    const updateContractor: Contractor = await ContractorEntity.findOne({ where: { id: contractorId } });
    return updateContractor;
  }

  public async deleteContractor(contractorId: number): Promise<Contractor> {
    const deletedContractor: Contractor[] = await getConnection().query(`DELETE FROM contractor_entity WHERE id = $1 RETURNING *`, [contractorId]);
    if (!deletedContractor.length) throw new HttpException(409, "Contractor doesn't exist");
    return deletedContractor[0];
  }
}
