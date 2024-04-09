import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ClientImages } from '@/interfaces/client_images.interface';

@Entity()
export class ClientImagesEntity extends BaseEntity implements ClientImages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  client_id: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  project_id: string;

  @Column({ nullable: true })
  project_code: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
