import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('author')
export class Author {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  email: string;
}
