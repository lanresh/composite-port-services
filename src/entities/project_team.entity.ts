import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ProjectTeam } from '@/interfaces/project_team.interface';

@Entity()
export class ProjectTeamEntity extends BaseEntity implements ProjectTeam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column( { nullable: true } )
  project_name: string;

  @Column({ nullable: true })
  project_code: string;

  @Column({ nullable: true })
  role: string;

  @Column({ nullable: true })
  staff_id: string;

  @Column({ nullable: true })
  staff_name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
