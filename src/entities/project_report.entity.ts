import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ProjectReport } from '@/interfaces/project_report.interface';

@Entity()
export class ProjectReportEntity extends BaseEntity implements ProjectReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  report_code: string;

  @Column({ nullable: true })
  report_type: string;

  @Column({ nullable: true })
  created_for: string;

  @Column({ nullable: true })
  project_name: string;

  @Column({ nullable: true })
  project_code: string;

  @Column({ nullable: true })
  project_supervisor: string;

  @Column({ nullable: true })
  report_summary: string;

  @Column({ nullable: true })
  challenges: string;

  @Column({ nullable: true })
  solutions: string;

  @Column({ nullable: true })
  recommendation: string;

  @Column({ nullable: true })
  weekly_projection: string;

  @Column({ nullable: true })
  materials_required_for_projection: string;

  @Column({ nullable: true })
  materials_on_site: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  submitted_by: string;

  @Column({ nullable: true })
  submitted_on: string;

  @Column({ nullable: true })
  visitor: string;

  @Column({ nullable: true })
  weather: string;

  @Column('simple-array',{array: true, nullable: true })
  photograph_id: string[];

  @Column({ nullable: true })
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

