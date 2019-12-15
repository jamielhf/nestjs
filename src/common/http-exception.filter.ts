import { ExceptionFilter, Catch, ArgumentsHost,BadRequestException, HttpException,HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiException } from './exceptions/api.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    // console.log('exception',exception.message);
    // 错误码400 判断是否有管道的验证信息
    if (status === HttpStatus.BAD_REQUEST) {
      let msg = exception.message.error;
      let message = exception.message.message;
      if(message) {
        if(Array.isArray(message)) {
          message.forEach((val,key)=>{
            if(val['constraints']['matches']) {
              msg = val['constraints']['matches'];
              return false;
            }
          })
        } else {
          msg = message;
        }
      }
     
      response
        .status(200)
        .json({
          code: status,
          msg,
        });
     }  else if (exception instanceof ApiException) {
      response
        .status(200)
        .json({
          code: exception.getErrorCode(),
          msg: exception.getErrorMessage(),
        });
    } else {
      response
      .status(200)
      .json({
        code: status,
        msg: exception.message.error,
      });
     }
   } 
   
}
