import { Author } from 'src/author/entities/author.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255 })
  content: string;

  @Column({ type: 'timestamptz', default: new Date() })
  news_date: Date;

  @ManyToOne(() => Author, (user) => user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'author' })
  author: Author;
}
