import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Request } from '@/interfaces/request.interface';

export enum STATUS {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    RECOMMENDED = 'RECOMMENDED'
}

@Entity()
export class RequestEntity extends BaseEntity implements Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  request_code: string;

  @Column({ nullable: true })
  carttemp_sess: string;

  @Column({ nullable: true })
  staff_id: string;

  @Column({ nullable: true })
  staff_name: string;

  @Column({ nullable: true })
  staff_email: string;

  @Column({ nullable: true })
  request_type: string;

  @Column({ nullable: true })
  project_name: string;

  @Column({ nullable: true })
  project_code: string;

  @Column({ nullable: true })
  supplier_code: string;

  @Column({ nullable: true })
  supplier_name: string;

  @Column({ nullable: true })
  supplier_material: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true, type: 'decimal', default: 0.0, precision: 10, scale: 2 })
  unit_price: number;

  @Column({ nullable: true, type: 'decimal', default: 0.0, precision: 10, scale: 2 })
  total_price: number;

  @Column({ nullable: true })
  worker_name: string;

  @Column({ nullable: true })
  worker_code: string;

  @Column({ nullable: true })
  worker_service: string;

  @Column({ nullable: true, type: 'decimal', default: 0.0, precision: 10, scale: 2 })
  amount: number;

  @Column({ nullable: true })
  job_code: string;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  response: string;

  @Column({ type: 'enum', enum: STATUS, default: STATUS.PENDING })
  status: STATUS;

  @Column({ nullable: true })
  date: Date;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  company_address: string;

  @Column({ nullable: true })
  contact_person: string;

  @Column({ nullable: true })
  contact_mobile: string;

  @Column({ nullable: true })
  ofc_phone: string;

  @Column({ nullable: true })
  cash_advance_purpose: string;

  @Column({ nullable: true })
  tool_name: string;

  @Column({ nullable: true })
  approved_by: string;

  @Column({ nullable: true })
  approved_on: Date;

  @Column({ nullable: true, type: 'decimal', default: 0.0, precision: 10, scale: 2 })
  approved_amount: number;

  @Column({ nullable: true })
  approved_quantity: number;

  @Column({ nullable: true, type: 'decimal', default: 0.0, precision: 10, scale: 2 })
  approved_unit_price: number;

  @Column({ nullable: true, type: 'decimal', default: 0.0, precision: 10, scale: 2 })
  approved_total_amount: number;

  @Column({ nullable: true })
  tool_machinery_type: string;

  @Column({ nullable: true })
  inventory_type_id: number;

  @Column({ nullable: true })
  supervisor_comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
