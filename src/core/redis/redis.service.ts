import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class RedisService {
  private readonly client : any;
  constructor(option) {
    const {port,host} = option;
    const redis = require('redis');

    this.client = redis.createClient(port,host);
  }
  async set(key:string,value:string,time: number = 3600 *24) {
    return new Promise((resolve,reject)=>{
      this.client.set(key,value,'EX',time, (err,val) => {
        if(!err){
          resolve(val);
        } else {
          reject(err);
        }
      })
    })
  }
  async get(key:string) {
    return new Promise((resolve,reject)=>{
      this.client.get(key, (err,val) => {
        if(!err){
          resolve(val);
        } else {
          reject(err);
        }
      })
    })
  }
}