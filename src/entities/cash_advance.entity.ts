import { BaseEntity, Entity,Unique, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CashAdvance } from '@/interfaces/cash_advance.interface';

export enum status {
    PENDING = 'Pending',
    APPROVED = 'Approved',
}

@Entity()
export class CashAdvanceEntity extends BaseEntity implements CashAdvance {
  @PrimaryGeneratedColumn()
  cash_id: number;

  @Column({ nullable: true })
  project_code: string;

  @Column({ nullable: true })
  project_name: string;

  @Column({ nullable: true })
  cash_advance_type: string;

  @Column({ nullable: true })
  @Unique(['request_code'])
  request_code: string;

  @Column({ nullable: true })
  staff_id: string;

  @Column({ nullable: true })
  staff_name: string;

  @Column({ nullable: true, type: 'decimal', default: 0.0, precision: 10, scale: 2 })
  amount_collected: number;

  @Column({ nullable: true, type: 'decimal', default: 0.0, precision: 10, scale: 2 })
  amount_recorded: number;

  @Column({ nullable: true, type: 'decimal', default: 0.0, precision: 10, scale: 2 })
  balance: number;

  @Column({ type: 'enum', enum: status, default: status.PENDING })
  status: status;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  decision: string;

  @Column({ nullable: true })
  decision_reason: string;

  @Column({ nullable: true })
  bank_to: string;

  @Column({ nullable: true })
  payment_method: string;

  @Column({ nullable: true })
  action_type: string;

  @Column({ nullable: true })
  action_by: string;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
