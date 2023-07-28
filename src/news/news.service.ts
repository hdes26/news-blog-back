import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { Repository } from 'typeorm';
import { Label } from './entities/label.entity';
import { Category } from './entities/category.entity';
import { Author } from 'src/author/entities/author.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private newsRepo: Repository<News>,
    @InjectRepository(Author) private authorRepo: Repository<Author>,
    @InjectRepository(Label) private labelRepo: Repository<Label>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}
  async create(createNewsDto: CreateNewsDto) {
    const authorFound = await this.authorRepo.findOneByOrFail({
      id: createNewsDto.authorId,
    });
    const labelFound = await this.labelRepo.findOneByOrFail({
      id: createNewsDto.labelId,
    });
    const categoryFound = await this.categoryRepo.findOneByOrFail({
      id: createNewsDto.categoryId,
    });
    return await this.newsRepo.save({
      author: authorFound,
      label: labelFound,
      category: categoryFound,
      ...createNewsDto,
    });
  }

  async findAll() {
    const news = await this.newsRepo.find({
      relations: ['author', 'label', 'category'],
    });

    return news;
  }

  async findOne(id: number) {
    const news = await this.newsRepo.findOneOrFail({
      relations: ['author', 'label', 'category'],
      where: { id },
    });
    return news;
  }

  async update(id: number, updateNewsDto: UpdateNewsDto) {
    const news = await this.newsRepo.findOneByOrFail({ id });
    return await this.newsRepo.update({ id: news.id }, updateNewsDto);
  }

  async remove(id: number) {
    const news = await this.newsRepo.findOneByOrFail({ id });
    return await this.newsRepo.delete({ id: news.id });
  }
}
