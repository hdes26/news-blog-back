import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({
    summary: 'Logearse para obtener token de acceso',
    description:
      'Dado un email, se podra logear un autor para obtener su token de acceso.',
  })
  @Post('/login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}
