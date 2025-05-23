import { BaseEntity, Entity, Unique, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Client } from '@/interfaces/client.interface';

@Entity()
export class ClientEntity extends BaseEntity implements Client {
  @PrimaryGeneratedColumn()
  client_id: number;

  @Column()
  @Unique(['userid'])
  userid: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  mobile_number: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  activation_code: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  id_type: string;

  @Column({ nullable: true })
  id_number: string;

  @Column({ nullable: true })
  id_image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
