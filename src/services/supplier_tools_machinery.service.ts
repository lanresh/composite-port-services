import { SupplierToolsMachineryEntity } from '@/entities/supplier_tools_machinery.entity';
import { HttpException } from '@/exceptions/HttpException';
import { SupplierToolsMachinery } from '@/interfaces/supplier_tools_machinery.interface';
import { EntityRepository, Repository, getConnection } from 'typeorm';

const generateToolCode = async () => {
  const count = await getConnection().getRepository(SupplierToolsMachineryEntity).count();

  //generate user id
  const tool_code = 'tool-' + (count + 1).toString().padStart(4, '0');
  return tool_code;
};

@EntityRepository(SupplierToolsMachineryEntity)
export class SupplierToolsMachineryService extends Repository<SupplierToolsMachineryEntity> {
  public async createSupplierToolsMachinery(userId: string, supplierToolsMachineryData: SupplierToolsMachinery): Promise<SupplierToolsMachinery> {
    const tool_code: string = await generateToolCode();

    const query = `INSERT INTO public.supplier_tools_machinery_entity(
            tool_code, supplier_code, supplier_name, tool_type, description, others, procurement_type, created_by, comment)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;

    const createSupplierToolsMachineryData: SupplierToolsMachinery = await getConnection().query(query, [
      tool_code,
      supplierToolsMachineryData.supplier_code,
      supplierToolsMachineryData.supplier_name,
      supplierToolsMachineryData.tool_type,
      supplierToolsMachineryData.description,
      supplierToolsMachineryData.others,
      supplierToolsMachineryData.procurement_type,
      userId,
      supplierToolsMachineryData.comment,
    ]);

    return createSupplierToolsMachineryData[0];
  }

  public async findAllSupplierToolsMachinery(): Promise<SupplierToolsMachinery[]> {
    const supplierToolsMachinery: SupplierToolsMachinery[] = await getConnection().query(
      'SELECT s.*, CONCAT(st.firstname, " ", st.lastname) FROM supplier_tools_machinery_entity s JOIN staff_entity st ON s.created_by = st.userid',
    );

    return supplierToolsMachinery;
  }

  public async findSupplierToolsMachineryById(id: number): Promise<SupplierToolsMachinery> {
    const supplierToolsMachinery: SupplierToolsMachinery = await getConnection().query(
      'SELECT * FROM supplier_tools_machinery_entity WHERE id = $1',
      [id],
    );

    return supplierToolsMachinery[0];
  }

  public async updateSupplierToolsMachinery(id: number, supplierToolsMachineryData: SupplierToolsMachinery): Promise<SupplierToolsMachinery> {
    const findMachinery: SupplierToolsMachinery = await SupplierToolsMachineryEntity.findOne({ where: { tool_id: id } });
    if (!findMachinery) throw new HttpException(409, "Machinery doesn't exist");

    await SupplierToolsMachineryEntity.update({ tool_id: id }, supplierToolsMachineryData);

    const updatedMachinery: SupplierToolsMachinery = await SupplierToolsMachineryEntity.findOne({ where: { tool_id: id } });
    return updatedMachinery;
  }

  public async deleteSupplierToolsMachinery(id: number): Promise<SupplierToolsMachinery> {
    const deletedMachinery: SupplierToolsMachinery = await getConnection().query(
      'DELETE FROM supplier_tools_machinery_entity WHERE tool_id = $1 RETURNING *',
      [id],
    );

    return deletedMachinery[0];
  }
}
