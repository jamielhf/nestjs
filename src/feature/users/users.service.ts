import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { Relations } from './relations.entity';
import { BaseService } from '../../common/mysql/base.service';
import { logger } from '../../common/logger';
import { ApiException } from '../../core/exceptions/api.exception';
import { ApiErrorCode } from '../../core/enums/api-error-code.enum';
import { Tag } from '../tag/tag.entity';
import { apiMsg } from '../../common/util';

@Injectable()
export class UsersService extends BaseService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Relations)
    private readonly relationsRepository: Repository<Relations>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {
    super();
  }
  public repository: Repository<Users> = this.usersRepository;
  create(data) {
    let user = new Users({
      ...data,
    });
    return this.repository.save(user);
  }
  /**
   *
   * 更新用户信息
   * @param {*} data
   * @param {*} userId
   * @returns
   * @memberof UsersService
   */
  async updateUserInfo(data, userId) {
    try {
      const res = await this.repository.update(userId, {
        [data.field]: data.value,
      });
      if (res) {
        return {
          msg: '更新成功',
        };
      }
    } catch (e) {
      logger.error(e);
      return {
        msg: '更新失败',
      };
    }
  }

  /**
   * 关注
   * @param userId
   * @param followUserId
   * @param status  0 取消关注 1关注
   */
  async follower(userId, followUserId, status) {
    if (userId === followUserId) {
      throw new ApiException('不能关注自己', ApiErrorCode.TIMEOUT);
    }
    try {
      const user = await this.repository.findOne({
        where: {
          id: followUserId,
        },
      });
      if (user) {
        const res = await this.relationsRepository.findOne({
          where: {
            uid: userId,
            followUserId,
          },
        });
        if (res) {
          const updateRes = await this.relationsRepository.update(res.id, {
            status,
          });
          if (updateRes) {
            return {
              msg: '成功',
            };
          }

          throw new ApiException('更新失败', ApiErrorCode.TIMEOUT);
        } else {
          const res = await this.relationsRepository.save({
            status,
            uid: userId,
            followUserId,
          });
          if (res) {
            return {
              msg: '成功',
            };
          }
          throw new ApiException('更新失败', ApiErrorCode.TIMEOUT);
        }
      } else {
        throw new ApiException('用户不存在', ApiErrorCode.USER_NO_EXIT);
      }
    } catch (e) {
      logger.error(e);
      throw new ApiException('更新失败', ApiErrorCode.TIMEOUT);
    }
  }
  /**
   *
   * @param {id,status}
   * @param userId
   */
  async followTag({ id, status }, userId) {
    const tag = await this.tagRepository.findOne({
      where: {
        id,
      },
    });
    if (!tag) {
      apiMsg('标签不存在', ApiErrorCode.DATA_NO_EXIT);
    }
    const user = await this.repository.findOne({
      where: {
        id: userId,
      },
      relations: ['tag'],
    });
    if (+status === 0) {
      user.tag = user.tag.filter(item => item.id !== id);
    } else {
      if (!user.tag.find(item => item.id === id)) {
        user.tag.push(tag);
      }
    }
    const res = await this.repository.save(user);
    if (res) {
      return {
        msg: '成功',
      };
    }
    apiMsg('更新失败', ApiErrorCode.TIMEOUT);
  }
}
