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
