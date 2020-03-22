import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { BaseService } from '../../common/mysql/base.service';
import { logger } from '../../common/logger';

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
  /**
   *
   * 更新用户信息
   * @param {*} data
   * @param {*} userId
   * @returns
   * @memberof UsersService
   */
  async updateUserInfo(data,userId) {
    try {
      const res = await this.repository.update(userId,{
        [data.field]: data.value
      })
      if(res) {
        return {
          msg: '更新成功'
        }
      }
    } catch (e) {
      logger.error(e);
      return {
        msg: '更新失败'
      }
    }
    
  }
}
