import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Project } from '@/interfaces/project.interface';

@Entity()
export class ProjectEntity extends BaseEntity implements Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  project_name: string;

  @Column({ nullable: true })
  project_description: string;

  @Column()
  project_code: string;

  @Column({ nullable: true })
  project_location: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  lga: string;

  @Column({ nullable: true })
  project_duration: string;

  @Column({ nullable: true })
  start_date: string;

  @Column({ nullable: true })
  end_date: string;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  date_added: string;

  @Column({ nullable: true })
  project_supervisor: string;

  @Column({ nullable: true })
  supervisor_id: string;

  @Column()
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
