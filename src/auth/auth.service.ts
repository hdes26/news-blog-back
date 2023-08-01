import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Author } from 'src/author/entities/author.entity';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { comparePassword } from 'src/utils/functions';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    @InjectRepository(Author) private authorRepo: Repository<Author>,
  ) {}
  private async getTokens(author: Author) {
    // Get access token and refresh access token
    const payload = { id: author.id, name: author.name };
    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_KEY'),
        expiresIn: '12h',
      }),
    ]);
    return {
      accessToken,
    };
  }
  async login({ email, password }: LoginDto) {
    const authFound = await this.authorRepo.findOne({ where: { email } });
    if (
      !authFound ||
      (authFound && comparePassword(password, authFound.password) === false)
    ) {
      throw new BadRequestException('e-mail or password invalid');
    }
    return await this.getTokens(authFound);
  }
}
