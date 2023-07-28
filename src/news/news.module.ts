import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { Author } from 'src/author/entities/author.entity';
import { Label } from './entities/label.entity';
import { Category } from './entities/category.entity';

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports: [TypeOrmModule.forFeature([News, Author, Label, Category])],
})
export class NewsModule {}
