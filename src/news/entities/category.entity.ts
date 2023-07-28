import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  description: string;
}
