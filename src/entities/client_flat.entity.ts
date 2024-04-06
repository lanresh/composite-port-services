import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ClientFlat } from '@/interfaces/client_flat.interface';

@Entity()
export class ClientFlatEntity extends BaseEntity implements ClientFlat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  client_id: string;

  @Column({ nullable: true })
  project_id: string;

  @Column({ nullable: true })
  project_code: string;

  @Column({ nullable: true })
  flat_code: string;

  @Column({ nullable: true })
  date: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
