import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ProjectWorker } from '@/interfaces/project_worker.interface';

@Entity()
export class ProjectWorkerEntity extends BaseEntity implements ProjectWorker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true } )
  project_code: string;

  @Column({ nullable: true })
  project_name: string;

  @Column({ nullable: true })
  service_type: string;

  @Column({ nullable: true })
  worker_code: string;

  @Column({ nullable: true })
  worker_name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
