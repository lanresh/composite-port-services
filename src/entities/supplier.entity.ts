import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Supplier } from '@/interfaces/supplier.interface';

@Entity()
export class SupplierEntity extends BaseEntity implements Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  supplier_code: string;

  @Column({ nullable: true })
  supplier_name: string;

  @Column({ nullable: true })
  supplier_address: string;

  @Column({ nullable: true })
  supplier_ofc_phone: string;

  @Column({ nullable: true })
  contact_person: string;

  @Column({ nullable: true })
  contact_mobile: string;

  @Column({ nullable: true })
  contact_home_phone: string;

  @Column({ nullable: true })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
