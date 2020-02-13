import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

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