import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ProjectFlats } from '@/interfaces/project_flats.interface';

export enum STATUS {
    VACANT = 'Vacant',
    OCCUPIED = 'Occupied'
}


@Entity()
export class ProjectFlatsEntity extends BaseEntity implements ProjectFlats {
  @PrimaryGeneratedColumn()
  flat_id: number;

  @Column({ nullable: true })
  flat_code: string;

  @Column({ nullable: true })
  project_name: string;

  @Column({ nullable: true })
  project_code: string;

  @Column({ nullable: true })
  flat_desc: string;

  @Column({ nullable: true })
  comment: string;

  @Column({ type: 'enum', enum: STATUS , default: STATUS.VACANT })
  status: STATUS;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
