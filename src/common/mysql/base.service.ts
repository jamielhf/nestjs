import { Injectable, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { logger, errorLogger } from '../logger';
import { ApiException } from '../../core/exceptions/api.exception';
import { ApiErrorCode } from '../../core/enums/api-error-code.enum';

@Injectable()
export abstract class BaseService {
  constructor() { }
  repository;
  /**
   * 查找全部
   *
   * @returns {Promise<any>}
   * @memberof BaseService
   */
  async findAll(): Promise<any> {
    try {
      return await this.repository.find();
    } catch (e) {
      errorLogger.error(e);
      return null
    }
  }
  /**
   *
   *
   * @param {*} update userid
   * @param {*} query
   * @returns {Promise<any>}
   * @memberof BaseService
   */
  async update(query, update): Promise<any> {
    try {
      const res = await this.repository.update(query, update);
      if (+res.raw.changedRows === 1) {
        return {
          msg: '更新成功'
        }
      } else {
        throw new ApiException('更新失败', ApiErrorCode.DATA_NO_EXIT);
      }
    } catch (e) {
      errorLogger.error(e);
      return null
    }


  }
  /**
   *
   * 条件查找返回一个数据
   * @param {*} query
   * @returns {Promise<any>}
   * @memberof BaseService
   */
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne<T>(query): Promise<T> {
    try {
      return await this.repository.findOne(query);
    } catch (e) {
      errorLogger.error(e);
      return null
    }
  }
  /**
   *
   * 条件查找 返回多个
   * @param {*} query
   * @returns {Promise<any>}
   * @memberof BaseService
   */
  async find(query): Promise<any> {
    try {
      return await this.repository.find(query);
    } catch (e) {
      errorLogger.error(e);
      return null
    }
  }

  async save(data): Promise<any> {
    console.log(111, data);
    try {
      return await this.repository.save(data);
    } catch (e) {
      console.log(222, e);
      errorLogger.error(e);
      return null
    }

  }


  /**
   *
   * 删除
   * @param {*} query
   * @returns {Promise<{msg: string}>}
   * @memberof BaseService
   */
  async delete(query): Promise<{ msg: string }> {
    try {
      const res = await this.repository.delete(query);
      if (+res.affected === 1) {
        return {
          msg: '删除成功'
        }
      } else {
        throw new ApiException('删除失败，内容不存在', ApiErrorCode.DATA_NO_EXIT);
      }
    } catch (e) {
      errorLogger.error(e);
      return null
    }

  }

}