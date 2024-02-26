import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Material } from '@/interfaces/material.interface';

@Entity()
export class MaterialEntity extends BaseEntity implements Material {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  project_code: string;

  @Column({ nullable: true })
  supplier_code: string;

  @Column({ nullable: true })
  supplier_name: string;

  @Column({ nullable: true })
  material_code: string;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  contact_person: string;

  @Column({ nullable: true })
  contact_mobile: string;

  @Column({ nullable: true })
  ofc_phone: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true })
  unit_price: number;

  @Column({ nullable: true })
  total_price: number;

  @Column({ nullable: true })
  payment_mode: string;

  @Column({ nullable: true })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
