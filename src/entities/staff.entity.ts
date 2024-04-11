import { BaseEntity, Entity, Unique, PrimaryGeneratedColumn, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Staff } from '@/interfaces/staff.interface';

@Entity()
export class StaffEntity extends BaseEntity implements Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  @Unique(['userid'])
  userid: string;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  middlename: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ nullable: true })
  dob: string;

  @Column({ nullable: true })
  stateOfOrigin: string;

  @Column({ nullable: true })
  lga: string;

  @Column({ nullable: true })
  sex: string;

  @Column({ nullable: true })
  marital_status: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  home_phone: string;

  @Column({ nullable: true })
  cell_phone: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  nextOfKin: string;

  @Column({ nullable: true })
  relationship: string;

  @Column({ nullable: true })
  addressOfNOK: string;

  @Column({ nullable: true })
  emailOfNOK: string;

  @Column({ nullable: true })
  phoneOfNOK: string;

  @Column({ nullable: true })
  date_employed: string;

  @Column({ nullable: true })
  deptid: string;

  @Column({ nullable: true })
  gradeid: string;

  @Column({ nullable: true })
  branchcode: string;

  @Column({ nullable: true })
  employee_status: string;

  @Column()
  role: string;

  @Column()
  staff_type: string;

  @Column({ nullable: true })
  bank_name: string;

  @Column({ nullable: true })
  account_name: string;

  @Column({ nullable: true })
  account_number: string;

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
