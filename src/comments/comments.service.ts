import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { News } from 'src/news/entities/news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/author/entities/author.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
    @InjectRepository(News) private newsRepo: Repository<News>,
    @InjectRepository(Author) private authorRepo: Repository<Author>,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    const newsFound = await this.newsRepo.findOneByOrFail({
      id: createCommentDto.newsId,
    });
    const authorFound = await this.authorRepo.findOneByOrFail({
      id: createCommentDto.authorId,
    });

    return await this.commentRepo.save({
      author: authorFound,
      news: newsFound,
      ...createCommentDto,
    });
  }

  async findAll() {
    const comments = await this.commentRepo.find({
      relations: ['news', 'author'],
    });

    return comments;
  }

  async findOne(id: number) {
    const comments = await this.commentRepo.findOneOrFail({
      relations: ['news', 'author'],
      where: { id },
    });
    return comments;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepo.findOneByOrFail({ id });
    return await this.commentRepo.update({ id: comment.id }, updateCommentDto);
  }

  async remove(id: number) {
    const comment = await this.commentRepo.findOneByOrFail({ id });
    return await this.commentRepo.delete({ id: comment.id });
  }
}
