import { MaterialEntity } from '@/entities/material.entity';
import { SupplierMaterialsEntity } from '@/entities/supplier_materials.entity';
import { HttpException } from '@/exceptions/HttpException';
import { generateRandomCode } from '@/helpers/code_generator.helper';
import { Material } from '@/interfaces/material.interface';
import { MaterialSubType } from '@/interfaces/material_subtype.interface';
import { MaterialType } from '@/interfaces/material_type.interface';
import { SupplierMaterials } from '@/interfaces/supplier_materials.interface';
import { Repository, getConnection, EntityRepository } from 'typeorm';

@EntityRepository()
export class SupplierMaterialService extends Repository<SupplierMaterialsEntity> {
  public async createSupplierMaterial(materialData: SupplierMaterials): Promise<SupplierMaterials> {
    const mat_code: string = await generateRandomCode('supplier_materials_entity', 'mat_code', 'mat');
    const query = `INSERT INTO public.supplier_materials_entity(
            mat_code, supplier_code, supplier_name, mat_desc, project_code, quantity, unit_price, total_price)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
    const createSupplierMaterialData: SupplierMaterials = await getConnection().query(query, [
      mat_code,
      materialData.supplier_code,
      materialData.supplier_name,
      materialData.mat_desc,
      materialData.project_code,
      materialData.quantity,
      materialData.unit_price,
      materialData.quantity * materialData.unit_price,
    ]);

    return createSupplierMaterialData[0];
  }

  public async findAllSupplierMaterials(): Promise<SupplierMaterials[]> {
    const supplierMaterials: SupplierMaterials[] = await getConnection().query('SELECT * FROM supplier_materials_entity');

    return supplierMaterials;
  }

  public async findSupplierMaterialById(materialId: number): Promise<SupplierMaterials> {
    const supplierMaterials: SupplierMaterials[] = await getConnection().query('SELECT * FROM supplier_materials_entity WHERE mat_id = $1', [
      materialId,
    ]);

    if (!supplierMaterials.length) throw new HttpException(409, "Material doesn't exist");

    return supplierMaterials[0];
  }

  public async fetchMaterialTypes(): Promise<MaterialType[]> {
    const materialTypes: MaterialType[] = await getConnection().query('SELECT material_type_id, material_type_desc FROM material_type_entity');

    return materialTypes;
  }

  public async fetchMaterialSubTypes(materialTypeId: number): Promise<MaterialSubType[]> {
    const materialSubTypes: MaterialSubType[] = await getConnection().query(
      `SELECT distinct sub_type_desc FROM material_sub_type_entity WHERE material_type_id = $1`,
      [materialTypeId],
    );

    return materialSubTypes;
  }

  public async fetchMaterialDescription(subType: string): Promise<MaterialSubType[]> {
    const materialDescription: MaterialSubType[] = await getConnection().query(
      `SELECT CONCAT(dimension, ' ', sub_type_category, ' ', sub_type_desc) AS description FROM material_sub_type_entity WHERE sub_type_desc = $1`,
      [subType],
    );

    return materialDescription;
  }

  public async findMaterialDescriptionBySupplierCode(supplierCode: string): Promise<SupplierMaterials[]> {
    return await getConnection().query(`SELECT * FROM public.material_entity WHERE supplier_code = $1`, [supplierCode]);
  }

  public async updateSupplierMaterial(materialId: number, materialData: SupplierMaterials): Promise<SupplierMaterials> {
    const findMaterial: SupplierMaterials = await SupplierMaterialsEntity.findOne({ where: { mat_id: materialId } });
    if (!findMaterial) throw new HttpException(409, "Material doesn't exist");

    await SupplierMaterialsEntity.update({ mat_id: materialId }, materialData);

    const updatedMaterial: SupplierMaterials = await SupplierMaterialsEntity.findOne({ where: { mat_id: materialId } });
    return updatedMaterial;
  }

  public async deleteSupplierMaterial(materialId: number): Promise<SupplierMaterials> {
    const deletedMaterial: SupplierMaterials[] = await getConnection().query(`DELETE FROM supplier_materials_entity WHERE mat_id = $1`, [materialId]);
    if (!deletedMaterial.length) throw new HttpException(409, "Material doesn't exist");

    return deletedMaterial[0];
  }
}
