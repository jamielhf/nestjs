import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
// import { LogServive } from '../../common/log/log.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    // private readonly logger: LogServive,
  ){}
  use(req: Request, res: Response, next: Function) {
    // this.logger.log(`====请求====`);
    // this.logger.log(`${JSON.stringify(req.originalUrl)} ${JSON.stringify(req.body)}`);
    next();
    // this.logger.log(`====响应====`);
  }
}