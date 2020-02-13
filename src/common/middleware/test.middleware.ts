import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { LogServive } from '../log/log.service';

@Injectable()
export class TestMiddleware implements NestMiddleware {
  constructor(
    
  ){}
  use(req: Request, res: Response, next: Function) {
    console.log('test1');
    next();
    console.log('text2')
  }
}