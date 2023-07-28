import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @ApiOkResponse({ description: 'create a news' })
  @ApiBadRequestResponse({ description: 'missing parameters or wrong type' })
  @ApiNotFoundResponse({ description: 'news not found' })
  @Post()
  async create(@Body() createNewsDto: CreateNewsDto) {
    return await this.newsService.create(createNewsDto);
  }
  @ApiOkResponse({ description: 'return all the news' })
  @ApiBadRequestResponse({ description: 'missing parameters or wrong type' })
  @ApiNotFoundResponse({ description: 'no registered news' })
  @Get()
  async findAll() {
    return await this.newsService.findAll();
  }
  @ApiOkResponse({ description: 'return a news' })
  @ApiNotFoundResponse({ description: 'news not found' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.newsService.findOne(+id);
  }
  @ApiOkResponse({ description: 'modify a news' })
  @ApiBadRequestResponse({ description: 'missing parameters or wrong type' })
  @ApiNotFoundResponse({ description: 'news not found' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return await this.newsService.update(+id, updateNewsDto);
  }
  @ApiOkResponse({ description: 'remove a news' })
  @ApiNotFoundResponse({ description: 'news not found' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.newsService.remove(+id);
  }
}
