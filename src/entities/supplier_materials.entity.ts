import { BaseEntity, Entity, Unique, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { SupplierMaterials } from '@/interfaces/supplier_materials.interface';

@Entity()
export class SupplierMaterialsEntity extends BaseEntity implements SupplierMaterials {
  @PrimaryGeneratedColumn()
  mat_id: number;

  @Column({ nullable: true })
  @Unique(['mat_code'])
  mat_code: string;

  @Column({ nullable: true })
  supplier_code: string;

  @Column({ nullable: true })
  supplier_name: string;

  @Column({ nullable: true })
  mat_desc: string;

  @Column({ nullable: true })
  project_code: string;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true })
  unit_price: number;

  @Column({ nullable: true })
  total_price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
