import { Author } from 'src/author/entities/author.entity';
import { News } from 'src/news/entities/news.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ length: 255 })
  text: string;

  @CreateDateColumn()
  comment_date: Date;

  @ManyToOne(() => News, (news) => news, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'news' })
  news: News;

  @ManyToOne(() => Author, (author) => author, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'author' })
  author: Author;
}
