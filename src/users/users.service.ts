import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  async findAll(): Promise<Users[]> {
    return await this.usersRepository.find();
  }
  findOneByToken(token: string) {
    console.log(token);
  }
}
