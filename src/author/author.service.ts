import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { encryptPassword } from 'src/utils/functions';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private authorRepo: Repository<Author>,
  ) {}
  async create(createAuthorDto: CreateAuthorDto) {
    return await this.authorRepo.save({
      ...createAuthorDto,
      password: encryptPassword(createAuthorDto.password),
    });
  }

  async findAll() {
    const users = await this.authorRepo.find();
    if (users.length === 0) {
      throw new NotFoundException('no registered users!');
    }
    return users;
  }

  async findOne(id: number) {
    const user = await this.authorRepo.findOneByOrFail({ id });
    return user;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const user = await this.authorRepo.findOneByOrFail({ id });
    return await this.authorRepo.update({ id: user.id }, updateAuthorDto);
  }

  async remove(id: number) {
    const user = await this.authorRepo.findOneByOrFail({ id });
    return await this.authorRepo.delete({ id: user.id });
  }
}
