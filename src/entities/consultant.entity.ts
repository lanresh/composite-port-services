import { BaseEntity, Entity, Unique, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Consultant } from '@/interfaces/consultant.interface';

@Entity()
export class ConsultantEntity extends BaseEntity implements Consultant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @Unique(['consultant_code'])
  consultant_code: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  contact: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  website: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
