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
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/utils/guards/jwt';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @ApiOkResponse({ description: 'create a comment' })
  @ApiBadRequestResponse({ description: 'missing parameters or wrong type' })
  @ApiNotFoundResponse({ description: 'comment not found' })
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Request()
    { user }: { user: { id: number; name: string; iat: Date; exp: Date } },
  ) {
    return await this.commentsService.create(user.id, createCommentDto);
  }
  @ApiOkResponse({ description: 'return all the comments' })
  @ApiBadRequestResponse({ description: 'missing parameters or wrong type' })
  @ApiNotFoundResponse({ description: 'no registered comment' })
  @Get()
  async findAll() {
    return await this.commentsService.findAll();
  }
  @ApiOkResponse({ description: 'return a comment' })
  @ApiNotFoundResponse({ description: 'comment not found' })
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.commentsService.findOne(+id);
  }
  @ApiOkResponse({ description: 'modify a comment' })
  @ApiBadRequestResponse({ description: 'missing parameters or wrong type' })
  @ApiNotFoundResponse({ description: 'comment not found' })
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return await this.commentsService.update(+id, updateCommentDto);
  }
  @ApiOkResponse({ description: 'remove a comment' })
  @ApiNotFoundResponse({ description: 'comment not found' })
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.commentsService.remove(+id);
  }
}
