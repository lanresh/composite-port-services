import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CashAdvanceBreakdown } from '@/interfaces/cash_advance_breakdown.interface';

@Entity()
export class CashAdvanceBreakdownEntity extends BaseEntity implements CashAdvanceBreakdown {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  request_code: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true, type: 'decimal', default: 0.0, precision: 10, scale: 2 })
  amount: number;

  @Column({ nullable: true })
  added_by: string;

  @Column({ nullable: true })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
