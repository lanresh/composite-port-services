import { BaseEntity, Entity, Unique ,PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Inventory } from '@/interfaces/inventory.interface';

@Entity()
export class InventoryEntity extends BaseEntity implements Inventory {
  @PrimaryGeneratedColumn()
  inventory_id: number;

  @Column({ nullable: true })
  @Unique(['inventory_code'])
  inventory_code: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  unit_price: number;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true })
  total_price: number;

  @Column({ nullable: true })
  total_quantity: number;

  @Column({ nullable: true })
  remaining_quantity: number;

  @Column({ nullable: true })
  created_by: string;

  @Column({ nullable: true })
  updated_by: string;

  @Column({ nullable: true })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
