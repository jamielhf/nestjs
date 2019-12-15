import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export abstract class BaseService {
  constructor() {}
  repository;
  async findAll(): Promise<any> {
    return await this.repository.find();
  }
  async findOne(query): Promise<any> {
    return await this.repository.findOne(query);
  }
  async find(query): Promise<any> {
    return await this.repository.find(query);
  }
}