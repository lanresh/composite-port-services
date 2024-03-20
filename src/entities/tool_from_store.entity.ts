import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ToolFromStore } from '@/interfaces/tool_from_store.interface';

@Entity()
export class ToolFromStoreEntity extends BaseEntity implements ToolFromStore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  tool_from_store_code: string;

  @Column({ nullable: true })
  tool_name: string;

  @Column({ nullable: true })
  picked_by: string;

  @Column({ nullable: true })
  picked_on: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  returned_on: string;

  @Column({ nullable: true })
  project_name: string;

  @Column({ nullable: true })
  project_code: string;

  @Column({ nullable: true })
  request_type: string;

  @Column({ nullable: true })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
