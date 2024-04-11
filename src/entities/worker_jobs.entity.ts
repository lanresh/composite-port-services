import { BaseEntity, Entity, Unique, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { WorkerJobs } from '@/interfaces/worker_jobs.interface';

@Entity()
export class WorkerJobsEntity extends BaseEntity implements WorkerJobs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @Unique(['job_code'])
  job_code: string;

  @Column({ nullable: true })
  worker_code: string;

  @Column({ nullable: true })
  project_code: string;

  @Column({ nullable: true })
  worker_service: string;

  @Column({ nullable: true, type: 'decimal', default: 0.0, precision: 10, scale: 2 })
  worker_service_charge: number;

  @Column({ nullable: true, type: 'decimal', default: 0.0, precision: 10, scale: 2 })
  amount_paid: number;

  @Column({ nullable: true, type: 'decimal', default: 0.0, precision: 10, scale: 2 })
  outstanding_balance: number;

  @Column({ nullable: true })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
