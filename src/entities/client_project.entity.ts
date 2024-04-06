import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ClientProject } from '@/interfaces/client_project.interface';

@Entity()
export class ClientProjectEntity extends BaseEntity implements ClientProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  client_id: string;

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
