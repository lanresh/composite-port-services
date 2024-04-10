import { EntityRepository, Repository, getConnection } from 'typeorm';
import { MaterialEntity } from '../entities/material.entity';
import { Material } from '../interfaces/material.interface';
import { HttpException } from '../exceptions/HttpException';
import { generateRandomCode } from '@/helpers/code_generator.helper';

@EntityRepository(MaterialEntity)
export class MaterialService extends Repository<MaterialEntity> {
  public async createMaterial(materialData: Material): Promise<Material> {
    const material_code: string = await generateRandomCode('material_entity', 'material_code', 'mat');
    const query = `INSERT INTO public.material_entity(
            project_code, supplier_code, supplier_name, material_code, company, address, contact_person, contact_mobile, ofc_phone, description, quantity, unit_price, total_price, payment_mode, comment)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`;

    const createMaterialData: Material = await getConnection().query(query, [
      materialData.project_code,
      materialData.supplier_code,
      materialData.supplier_name,
      material_code,
      materialData.company,
      materialData.address,
      materialData.contact_person,
      materialData.contact_mobile,
      materialData.ofc_phone,
      materialData.description,
      materialData.quantity,
      materialData.unit_price,
      materialData.quantity * materialData.unit_price || 0,
      materialData.payment_mode,
      materialData.comment,
    ]);

    return createMaterialData[0];
  }

  public async findAllMaterials(): Promise<Material[]> {
    return await getConnection().query(`SELECT * FROM public.material_entity`);
  }

  public async findMaterialById(materialId: number): Promise<Material> {
    const material: Material[] = await getConnection().query(`SELECT * FROM public.material_entity WHERE id = $1`, [materialId]);
    if (!material.length) throw new HttpException(409, "Material doesn't exist");
    return material[0];
  }

  public async findAllMaterialsByProject(projectCode: string): Promise<Material[]> {
    return await getConnection().query(`SELECT * FROM public.material_entity WHERE project_code = $1`, [projectCode]);
  }

  public async updateMaterial(materialId: number, materialData: Material): Promise<Material> {
    const findMaterial: Material = await MaterialEntity.findOne({ where: { id: materialId } });
    if (!findMaterial) throw new HttpException(409, "Material doesn't exist");

    await MaterialEntity.update({ id: materialId }, materialData);
    const updatedMaterial: Material = await MaterialEntity.findOne({ where: { id: materialId } });
    return updatedMaterial;
  }

  public async deleteMaterial(materialId: number): Promise<Material> {
    const deletedMaterial: Material[] = await getConnection().query(`DELETE FROM public.material_entity WHERE id = $1 RETURNING *`, [materialId]);
    if (!deletedMaterial.length) throw new HttpException(409, "Material doesn't exist");
    return deletedMaterial[0];
  }
}
