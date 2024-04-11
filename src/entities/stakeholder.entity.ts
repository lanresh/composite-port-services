import { BaseEntity, Entity, Unique, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Stakeholder } from '@/interfaces/stakeholder.interface';

@Entity()
export class StakeholderEntity extends BaseEntity implements Stakeholder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Unique(['stakeholder_code'])
  stakeholder_code: string;

  @Column({ nullable: true })
  stakeholder_name: string;

  @Column({ nullable: true })
  stakeholder_address: string;

  @Column({ nullable: true })
  stakeholder_ofc_phone: string;

  @Column({ nullable: true })
  government_agencies: string;

  @Column({ nullable: true })
  non_government_agencies: string;

  @Column({ nullable: true })
  other_agency: string;

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
