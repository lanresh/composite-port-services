import { SupplierEntity } from '@/entities/supplier.entity';
import { HttpException } from '@/exceptions/HttpException';
import { generateRandomCode } from '@/helpers/code_generator.helper';
import { Supplier } from '@/interfaces/supplier.interface';
import { EntityRepository, Repository, getConnection } from 'typeorm';

@EntityRepository(SupplierEntity)
export class SupplierService extends Repository<SupplierEntity> {
  public async createSupplier(supplierData: Supplier): Promise<Supplier> {
    const supplier_code: string = await generateRandomCode('supplier_entity', 'supplier_code', 'supp');

    const query = `INSERT INTO public.supplier_entity(
            supplier_code, supplier_name, supplier_address, supplier_ofc_phone, contact_person, contact_mobile, contact_home_phone, comment, email, website)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;

    const createSupplierData: Supplier = await getConnection().query(query, [
      supplier_code,
      supplierData.supplier_name,
      supplierData.supplier_address,
      supplierData.supplier_ofc_phone,
      supplierData.contact_person,
      supplierData.contact_mobile,
      supplierData.contact_home_phone,
      supplierData.comment,
      supplierData.email,
      supplierData.website,
    ]);

    return createSupplierData[0];
  }

  public async findAllSuppliers(): Promise<Supplier[]> {
    const suppliers: Supplier[] = await getConnection().query('SELECT * FROM supplier_entity');

    return suppliers;
  }

  public async findSupplierById(supplierId: number): Promise<Supplier> {
    const suppliers: Supplier[] = await getConnection().query('SELECT * FROM supplier_entity WHERE id = $1', [supplierId]);

    if (!suppliers.length) throw new HttpException(409, "Supplier doesn't exist");

    return suppliers[0];
  }

  public async updateSupplier(supplierId: number, supplierData: Supplier): Promise<Supplier> {
    const findSupplier: Supplier = await SupplierEntity.findOne({ where: { id: supplierId } });
    if (!findSupplier) throw new HttpException(409, "Supplier doesn't exist");

    await SupplierEntity.update({ id: supplierId }, supplierData);

    const updatedSupplier: Supplier = await SupplierEntity.findOne({ where: { id: supplierId } });
    return updatedSupplier;
  }

  public async deleteSupplier(supplierId: number): Promise<Supplier> {
    const deletedStaff: Supplier[] = await getConnection().query(`DELETE FROM supplier_entity WHERE id = $1 RETURNING *`, [supplierId]);
    if (!deletedStaff.length) throw new HttpException(409, "Supplier doesn't exist");

    return deletedStaff[0];
  }
}
