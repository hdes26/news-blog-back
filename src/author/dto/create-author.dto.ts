import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty()
  @IsString({
    message: 'name should be string',
  })
  name: string;

  @ApiProperty()
  @IsString({
    message: 'email should be string',
  })
  email: string;
}
