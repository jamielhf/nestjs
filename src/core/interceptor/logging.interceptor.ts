import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { requestLogger } from '../../common/logger';
import { classToPlain } from 'class-transformer';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const url = request.originalUrl;
    const statusCode = response.statusCode;
    requestLogger.info(`${url}-${statusCode}`, request.body);
    return next
      .handle()
      .pipe(
        map((data) => {
          let msg = 'success';
          let obj = data;
          if (data.msg) {
            msg = data.msg;
            obj = data.data;
          }
          const res = {
            code: 200,
            msg: data.msg || 'success',
            data: classToPlain(obj) || {},
          };
          requestLogger.info(`${url}-${statusCode}`, JSON.stringify(res));
          return res;
        })
      );
  }
}