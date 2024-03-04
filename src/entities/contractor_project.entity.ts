import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ContractorProject } from '@/interfaces/contractor_project.interface';

@Entity()
export class ContractorProjectEntity extends BaseEntity implements ContractorProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  contractor_code: string;

  @Column({ nullable: true })
  contractor_project_code: string;

  @Column({ nullable: true, type: 'decimal', default: 0.0, precision: 10, scale: 2 })
  contractor_amount: number;

  @Column({ nullable: true, type: 'decimal', default: 0.0, precision: 10, scale: 2 })
  approved_amount: number;

  @Column({ nullable: true })
  service: string;

  @Column({ nullable: true })
  createdBy: string;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
