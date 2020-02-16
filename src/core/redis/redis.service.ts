import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class RedisService {
  private readonly client : any;
  constructor(option) {
    const {port,host} = option;
    const redis = require('redis');

    this.client = redis.createClient(port,host);
  }
  set(key:string,value:string) {
    return this.client.set(key,value);
  }
  get(key:string) {
    return this.client.get(key);
  }
}