import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { MaterialSubType } from '@/interfaces/material_subtype.interface';

@Entity()
export class MaterialSubTypeEntity extends BaseEntity implements MaterialSubType {
  @PrimaryGeneratedColumn()
  sub_type_id: number;

  @Column({ nullable: true })
  sub_type_desc: string;

  @Column({ nullable: true })
  material_type_id: number;

  @Column({ nullable: true })
  dimension: string;

  @Column({ nullable: true })
  sub_type_category: string;

  @Column({ nullable: true })
  created_by: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
