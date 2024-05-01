import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { RequestComment } from '@/interfaces/request_comment.interface';

@Entity()
export class RequestCommentEntity extends BaseEntity implements RequestComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  request_code: string;

  @Column({ nullable: true })
  user_id: string;

  @Column({ nullable: true })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
