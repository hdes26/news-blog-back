import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
  constructor(@InjectRepository(News) private newsRepo: Repository<News>) {}
  async create(createNewsDto: CreateNewsDto) {
    return await this.newsRepo.save(createNewsDto);
  }

  async findAll() {
    const news = await this.newsRepo.find();
    if (news.length === 0) {
      throw new NotFoundException('no registered news!');
    }
    return news;
  }

  async findOne(id: number) {
    const news = await this.newsRepo.findOneByOrFail({ id });
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
