import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthorModule } from './author/author.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsModule } from './news/news.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './utils/strategies/jwt';

@Module({
  controllers: [AppController],
  providers: [AppService, AccessTokenStrategy],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    {
      ...JwtModule.register({}),
      global: true,
    },
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      url: process.env.DB_URL,
      entities: ['dist/**/**/*.entity{.ts,.js}'],
      synchronize: false,
      retryDelay: 3000,
      retryAttempts: 10,
    }),
    AuthorModule,
    NewsModule,
    CommentsModule,
    AuthModule,
  ],
})
export class AppModule {}
