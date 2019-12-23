/*
 * @Author: your name
 * @Date: 2019-12-02 15:03:49
 * @LastEditTime: 2019-12-23 17:09:55
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \nestjs\src\feature\users\users.service.ts
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { BaseService } from '../../common/mysql/base.service';

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
  create(data) {
    let user = new Users();
    user = {
      ...data,
    }
    return this.repository.save(user)
  }
}
