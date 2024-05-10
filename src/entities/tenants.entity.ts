import { BaseEntity, Entity, Unique, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Tenant } from '@/interfaces/tenants.interface';

export type fees = {
  type: string;
  value: number;
}

@Entity()
export class TenantEntity extends BaseEntity implements Tenant {
  @PrimaryGeneratedColumn()
  tenant_id: number;

  @Column({ nullable: true })
  @Unique(['tenant_code'])
  tenant_code: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  full_name: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  project_name: string;

  @Column({ nullable: true })
  project_code: string;

  @Column({ nullable: true })
  project_details: string;

  @Column({ nullable: true })
  flat_description: string;

  @Column({ nullable: true })
  flat_code: string;

  @Column({ nullable: true, type: 'decimal', default: 0.0, precision: 10, scale: 2 })
  annual_rent: number;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  rent_payment: string;

  @Column({ nullable: true })
  reminder: string;

  @Column({type: 'jsonb', nullable: true })
  fees: Array<fees>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
