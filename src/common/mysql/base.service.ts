import { Injectable, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { logger, errorLogger } from '../logger';

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
    return await this.repository.update(query, update);
  }
  /**
   *
   * 条件查找返回一个数据
   * @param {*} query
   * @returns {Promise<any>}
   * @memberof BaseService
   */
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(query): Promise<any> {
    try {
      return await this.repository.findOne(query);
    } catch (e) {
      errorLogger.log(e);
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
  @UseInterceptors(ClassSerializerInterceptor)
  async find(query): Promise<any> {
    try {
      return await this.repository.find(query);
    } catch (e) {
      errorLogger.log(e);
      return null
    }
  }

  async save(data): Promise<any> {
    return await this.repository.save(data);
  }

  /**
   *
   * 删除
   * @param {*} query
   * @returns {Promise<any>}
   * @memberof BaseService
   */
  async delete(query): Promise<any> {
    return await this.repository.delete(query);
  }

}