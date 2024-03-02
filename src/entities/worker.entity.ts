import { BaseEntity, Entity, Unique,PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Worker } from '@/interfaces/worker.interface';

@Entity()
export class WorkerEntity extends BaseEntity implements Worker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Unique(['worker_code'])
  worker_code: string;

  @Column({ nullable: true })
  worker_name: string;

  @Column({ nullable: true })
  worker_company: string;

  @Column({ nullable: true })
  worker_address: string;

  @Column({ nullable: true })
  worker_email: string;

  @Column({ nullable: true })
  worker_mobile: string;

  @Column({ nullable: true })
  worker_home_phone: string;

  @Column({ nullable: true })
  worker_ofc_phone: string;

  @Column({ nullable: true })
  service_type: string;

  @Column({ nullable: true })
  section: string;

  @Column({ nullable: true })
  worker_source: string;

  @Column({ nullable: true })
  site_management: string;

  @Column({ nullable: true })
  project_code: string;

  @Column({ nullable: true })
  worker_service: string;

  @Column({ nullable: true })
  worker_service_charge: number;

  @Column({ nullable: true })
  amount_paid: number;

  @Column({ nullable: true })
  outstanding_balance: number;

  @Column({ nullable: true })
  date_assigned_to_project: Date;

  @Column({ nullable: true })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
