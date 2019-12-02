import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { BaseService } from '../../common/base.service';
@Injectable()
export class UsersService extends BaseService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {
    super();
    this.repository = this.usersRepository;
  }
  getHello(): string {
    return 'Hello World!';
  }
  // async findAll(): Promise<Users[]> {
  //   return await this.usersRepository.find();
  // }
  async findOne(query): Promise<Users> {
    return await this.usersRepository.findOne(query);
  }
}
