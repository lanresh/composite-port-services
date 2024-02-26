import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { MaterialType } from '@/interfaces/material_type.interface';

@Entity()
export class MaterialTypeEntity extends BaseEntity implements MaterialType {
  @PrimaryGeneratedColumn()
  material_type_id: number;

  @Column({ nullable: true })
  material_type_desc: string;

  @Column({ nullable: true })
  created_by: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
