import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/utils/guards/jwt';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @ApiOkResponse({ description: 'create a news' })
  @ApiBadRequestResponse({ description: 'missing parameters or wrong type' })
  @ApiNotFoundResponse({ description: 'news not found' })
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Post()
  async create(
    @Body() createNewsDto: CreateNewsDto,
    @Request()
    { user }: { user: { id: number; name: string; iat: Date; exp: Date } },
  ) {
    return await this.newsService.create(user.id, createNewsDto);
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
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return await this.newsService.update(+id, updateNewsDto);
  }
  @ApiOkResponse({ description: 'remove a news' })
  @ApiNotFoundResponse({ description: 'news not found' })
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.newsService.remove(+id);
  }
}
