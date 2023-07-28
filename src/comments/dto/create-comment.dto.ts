import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'Me parece muy acertado mi estimado.' })
  @IsString({
    message: 'text should be string',
  })
  text: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  newsId: number;
  @ApiProperty({ example: 1 })
  @IsNumber()
  authorId: number;
}
