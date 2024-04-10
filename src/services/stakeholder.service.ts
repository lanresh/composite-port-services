import { EntityRepository, Repository, getConnection } from 'typeorm';
import { StakeholderEntity } from '@entities/stakeholder.entity';
import { Stakeholder } from '@interfaces/stakeholder.interface';
import { HttpException } from '@exceptions/HttpException';
import { generateRandomCode } from '@/helpers/code_generator.helper';


@EntityRepository(StakeholderEntity)
export class StakeholderService extends Repository<StakeholderEntity> {
  public async findAllStakeholders(): Promise<Stakeholder[]> {
    try {
      const allStakeholders = await getConnection().query(`
        SELECT * FROM stakeholder_entity
      `);
      return allStakeholders;
    } catch (error) {
      throw error;
    }
  }

  public async findStakeholderById(stakeholderId: number): Promise<Stakeholder | string> {
    try {
      const stakeholder = await getConnection().query(
        'SELECT * FROM stakeholder_entity WHERE id = $1',
        [stakeholderId]
      );
      const result = stakeholder.length ? stakeholder[0] : undefined;
      if (!result) {
        return "No stakeholder found with this ID.";
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async createStakeholder(stakeholderData: Partial<Stakeholder>): Promise<Stakeholder> {
    try {
      const stakeholder_code = await generateRandomCode('stakeholder_entity', 'stakeholder_code', 'stk');
      const connection = getConnection();
      const query = `
        INSERT INTO stakeholder_entity(stakeholder_code, stakeholder_name, stakeholder_address, stakeholder_ofc_phone, government_agencies, non_government_agencies, other_agency, contact_person, contact_mobile, contact_home_phone, comment)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *
      `;
      const result = await connection.query(query, [
        stakeholder_code,
        stakeholderData.stakeholder_name,
        stakeholderData.stakeholder_address,
        stakeholderData.stakeholder_ofc_phone,
        stakeholderData.government_agencies,
        stakeholderData.non_government_agencies,
        stakeholderData.other_agency,
        stakeholderData.contact_person,
        stakeholderData.contact_mobile,
        stakeholderData.contact_home_phone,
        stakeholderData.comment,
      ]);
      return result[0];
    } catch (error) {
      throw error;
    }
  }

  public async updateStakeholder(stakeholderId: number, stakeholderData: Partial<Stakeholder>): Promise<Stakeholder> {
    try {
      const findStakeholder: Stakeholder| undefined = await StakeholderEntity.findOne({ where: { id: stakeholderId } });
      if (!findStakeholder) throw new HttpException(409,"Stakeholder doesn't exist");

      await StakeholderEntity.update(stakeholderId, { ...stakeholderData });

      const updateStakeholder: Stakeholder | undefined = await StakeholderEntity.findOne({ where: { id: stakeholderId } });
      return updateStakeholder;    
    } catch (error) {
      throw error;
    }
  }


  public async deleteStakeholder(stakeholderId: number): Promise<void> {
    try {
      await getConnection().query('DELETE FROM stakeholder_entity WHERE id = $1', [stakeholderId]);
    } catch (error) {
      throw error;
    }
  }
}
