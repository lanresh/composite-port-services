import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Contractor } from '@/interfaces/contractor.interface';

@Entity()
export class ContractorEntity extends BaseEntity implements Contractor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  contractor_code: string;

  @Column({ nullable: true })
  contractor_name: string;

  @Column({ nullable: true })
  contractor_service: string;

  @Column({ nullable: true })
  contractor_address: string;

  @Column({ nullable: true })
  contractor_ofc_phone: string;

  @Column({ nullable: true })
  contact_person: string;

  @Column({ nullable: true })
  contact_mobile: string;

  @Column({ nullable: true })
  contact_home_phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
