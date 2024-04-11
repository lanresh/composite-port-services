import { BaseEntity, Entity, Unique, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { StakeholderProject } from '@/interfaces/stakeholder_project.interface';

@Entity()
export class StakeholderProjectEntity extends BaseEntity implements StakeholderProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  stakeholder_code: string;

  @Column({ nullable: true })
  @Unique(['stakeholder_project_code'])
  stakeholder_project_code: string;

  @Column( { nullable: true, type: 'decimal', default: 0.0, precision: 10, scale: 2 })
  stakeholder_amount: number;

  @Column({ nullable: true, type: 'decimal', default: 0.0, precision: 10, scale: 2 })
  approved_amount: number;

  @Column({ nullable: true, type: 'decimal', default: 0.0, precision: 10, scale: 2 })
  other_amount: number;

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
