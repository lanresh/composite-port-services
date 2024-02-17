import { BaseEntity, Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '@/interfaces/users.interface';

@Entity()
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  userid: string;
  
  @Column()
  @Unique(['email'])
  email: string;

  @Column({ nullable: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  menu_right: string;

  @Column({ nullable: true })
  user_type: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  lastlogdate: string;

  @Column({ nullable: true })
  pwd_status: number;

  @Column({ nullable: true })
  pwd_date_created: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}

