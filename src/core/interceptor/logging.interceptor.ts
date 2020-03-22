import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { requestLogger } from '../../common/logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const url = request.originalUrl;
    const statusCode = response.statusCode;
    requestLogger.info(`${url}-${statusCode}`,request.body);
    return next
      .handle()
      .pipe(
        map(data=>{
          const res = {
            code: 200,
            msg: (data &&  data.msg) || 'success',
            data: (data &&  data.data) || {},
          };
          requestLogger.info(`${url}-${statusCode}`, JSON.stringify(res));
          response.json(res);
        })
      );
  }
}