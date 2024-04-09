import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ProjectComment } from '@/interfaces/project_comment.interface';

@Entity()
export class ProjectCommentEntity extends BaseEntity implements ProjectComment {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @Column( { nullable: true } )
  client_id: string;

  @Column({ nullable: true })
  project_code: string;

  @Column({ nullable: true })
  comment_code: string;

  @Column({ nullable: true })
  sender_name: string;

  @Column({ nullable: true })
  comment_title: string;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
