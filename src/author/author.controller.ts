import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('author')
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}
  @ApiOkResponse({ description: 'create a new author' })
  @ApiBadRequestResponse({ description: 'missing parameters or wrong type' })
  @ApiNotFoundResponse({ description: 'user not found' })
  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto) {
    return await this.authorService.create(createAuthorDto);
  }
  @ApiOkResponse({ description: 'return all the authors' })
  @ApiBadRequestResponse({ description: 'missing parameters or wrong type' })
  @ApiNotFoundResponse({ description: 'no registered authors' })
  @Get()
  async findAll() {
    return await this.authorService.findAll();
  }
  @ApiOkResponse({ description: 'return a user' })
  @ApiNotFoundResponse({ description: 'user not found' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.authorService.findOne(+id);
  }
  @ApiOkResponse({ description: 'modify a user' })
  @ApiBadRequestResponse({ description: 'missing parameters or wrong type' })
  @ApiNotFoundResponse({ description: 'user not found' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return await this.authorService.update(+id, updateAuthorDto);
  }
  @ApiOkResponse({ description: 'remove a user' })
  @ApiNotFoundResponse({ description: 'user not found' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.authorService.remove(+id);
  }
}
