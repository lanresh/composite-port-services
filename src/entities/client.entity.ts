import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Client } from '@/interfaces/client.interface';

@Entity()
export class ClientEntity extends BaseEntity implements Client {
  @PrimaryGeneratedColumn()
  client_id: number;

  @Column()
  userid: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column()
  mobile_number: string;

  @Column()
  address: string;

  @Column()
  state: string;

  @Column()
  activation_code: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
