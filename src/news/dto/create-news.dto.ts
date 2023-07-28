import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty({ example: 'Alienigenas atacan !' })
  @IsString({
    message: 'title should be string',
  })
  title: string;

  @ApiProperty({
    example:
      'En un remoto planeta, los pacíficos alienígenas "Lumos" enviaron una sonda a la Tierra. Dos niños curiosos la descubrieron y establecieron una amistad intergaláctica. Pero, cuando el gobierno lo supo, los persiguieron.',
  })
  @IsString({
    message: 'content should be string',
  })
  content: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  labelId: number;
  @ApiProperty({ example: 1 })
  @IsNumber()
  authorId: number;
  @ApiProperty({ example: 1 })
  @IsNumber()
  categoryId: number;
}
