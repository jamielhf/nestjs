import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  private readonly users: any[];
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
      },
    ];
  }
  getHello(): string {
    return 'Hello World!';
  }
  async findAll(): Promise<Users[]> {
    return await this.usersRepository.find();
  }
  async findOne(username: string): Promise<any | undefined> {
    return this.users.find(user => user.username === username);
  }
}
