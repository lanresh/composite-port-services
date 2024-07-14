import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { StaffPrivilege } from '@/interfaces/staff_privilege.interface';

@Entity()
export class StaffPrivilegeEntity extends BaseEntity implements StaffPrivilege {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  staff_id: string;

  @Column({ nullable: true })
  type : string;

  @Column({ nullable: true })
  can_view : number;

  @Column({ nullable: true })
  can_edit : number;

  @Column({ nullable: true })
  can_delete : number;

  @Column({ nullable: true })
  can_create : number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
