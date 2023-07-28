import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('label')
export class Label {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  description: string;
}
