import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ConsultantProject } from '@/interfaces/consultant_project.interface';

@Entity()
export class ConsultantProjectEntity extends BaseEntity implements ConsultantProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  consultant_id: string;

  @Column({ nullable: true })
  project_id: string;

  @Column({ nullable: true })
  project_code: string;

  @Column({ nullable: true })
  project_name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
