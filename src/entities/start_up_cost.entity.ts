import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { StartupCost } from '@/interfaces/start_up_cost.interface';

@Entity()
export class StartupCostEntity extends BaseEntity implements StartupCost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  startup_code: string;

  @Column({ nullable: true })
  project_code: string;

  @Column({ nullable: true })
  startup_desc: string;

  @Column({ nullable: true })
  startup_type: string;

  @Column({ nullable: true, type: 'decimal', default: 0.0, precision: 10, scale: 2 })
  startup_cost: number;

  @Column({ nullable: true })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
