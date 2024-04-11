import { BaseEntity, Entity, Unique, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { SupplierToolsMachinery } from '@/interfaces/supplier_tools_machinery.interface';

@Entity()
export class SupplierToolsMachineryEntity extends BaseEntity implements SupplierToolsMachinery {
  @PrimaryGeneratedColumn()
  tool_id: number;

  @Column({ nullable: true })
  @Unique(['tool_code'])
  tool_code: string;

  @Column({ nullable: true })
  supplier_code: string;

  @Column({ nullable: true })
  supplier_name: string;

  @Column({ nullable: true })
  tool_type: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  others: string;

  @Column({ nullable: true })
  procurement_type: string;

  @Column()
  created_by: string;

  @Column()
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
