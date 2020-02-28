import { Injectable, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export abstract class BaseService {
  constructor() {}
  repository;
  /**
   * 查找全部
   *
   * @returns {Promise<any>}
   * @memberof BaseService
   */
  async findAll(): Promise<any> {
    return await this.repository.find();
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
    return await this.repository.findOne(query);
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
    return await this.repository.find(query);
  }

  async save(data):Promise<any> {
    return await this.repository.save(data);
  }
}