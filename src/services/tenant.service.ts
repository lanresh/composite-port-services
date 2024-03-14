import { TenantEntity } from '@/entities/tenants.entity';
import { HttpException } from '@/exceptions/HttpException';
import { Tenant } from '@/interfaces/tenants.interface';
import { EntityRepository, Repository, getConnection } from 'typeorm';

const generateTenantCode = async (): Promise<string> => {
  const count = await getConnection().getRepository(TenantEntity).count();
  const tenant_code = 'ten-' + (count + 1).toString().padStart(4, '0');
  return tenant_code;
};

@EntityRepository(TenantEntity)
export class TenantService extends Repository<TenantEntity> {
  public async createTenant(tenantData: Tenant): Promise<Tenant> {
    // generate tenant code
    const tenant_code = await generateTenantCode();
    const query = `INSERT INTO public.tenant_entity(
            tenant_code, title, full_name, phone_number, email, password, project_name, project_details, flat_description, flat_code, annual_rent, comment, status, rent_payment, reminder, fees)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *`;

    const createTenantData: Tenant = await getConnection().query(query, [
      tenant_code,
      tenantData.title,
      tenantData.full_name,
      tenantData.phone_number,
      tenantData.email,
      tenantData.password,
      tenantData.project_name,
      tenantData.project_details,
      tenantData.flat_description,
      tenantData.flat_code,
      tenantData.annual_rent,
      tenantData.comment,
      tenantData.status,
      tenantData.rent_payment,
      tenantData.reminder,
      tenantData.fees,
    ]);
    return createTenantData[0];
  }

  public async findAllTenants(): Promise<Tenant[]> {
    return await getConnection().query('SELECT * FROM public.tenant_entity');
  }

  public async findTenantById(tenantId: number): Promise<Tenant> {
    const tenant: Tenant[] = await getConnection().query(`SELECT * FROM public.tenant_entity WHERE tenant_id = $1`, [tenantId]);
    if (!tenant.length) throw new HttpException(409, `Tenant with ID ${tenantId} does not exist`);

    return tenant[0];
  }

  public async updateTenant(tenantId: number, tenantData: Tenant): Promise<Tenant> {
    const findTenant: Tenant = await TenantEntity.findOne({ where: { tenant_id: tenantId } });
    if (!findTenant) throw new HttpException(409, `Tenant with ID ${tenantId} does not exist`);

    await TenantEntity.update({ tenant_id: tenantId }, tenantData);
    const updatedTenant: Tenant = await TenantEntity.findOne({ where: { tenant_id: tenantId } });
    return updatedTenant;
  }

  public async deleteTenant(tenantId: number): Promise<Tenant> {
    const deleteTenant: Tenant[] = await getConnection().query(`DELETE FROM public.tenant_entity WHERE tenant_id = $1 RETURNING *`, [tenantId]);
    if (!deleteTenant.length) throw new HttpException(409, `Tenant with ID ${tenantId} does not exist`);

    return deleteTenant[0];
  }
}
