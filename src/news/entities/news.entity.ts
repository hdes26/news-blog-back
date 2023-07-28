import { Author } from 'src/author/entities/author.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Label } from './label.entity';
import { Category } from './category.entity';

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

  @ManyToOne(() => Author, (author) => author, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'author' })
  author: Author;

  @ManyToOne(() => Label, (label) => label, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'label' })
  label: Label;

  @ManyToOne(() => Category, (category) => category, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category' })
  category: Category;
}
