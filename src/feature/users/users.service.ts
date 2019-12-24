/*
 * @Author: your name
 * @Date: 2019-12-02 15:03:49
 * @LastEditTime : 2019-12-24 15:53:03
 * @LastEditors  : Please set LastEditors
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
  create(data) {
    let user = new Users();
    user = {
      ...data,
    }
    return this.repository.save(user)
  }
}
