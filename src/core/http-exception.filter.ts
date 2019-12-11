import { ExceptionFilter, Catch, ArgumentsHost,BadRequestException, HttpException,HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    console.log(exception.message);
    // 如果错误码 400
    if (status === HttpStatus.BAD_REQUEST) {
      let msg = exception.message.error;
      let message = exception.message.message;
      if(message[0] && message[0]['constraints'] ) {
        msg = message[0]['constraints']['matches'];
      } else {
        msg = message;
      }
      response
        .status(200)
        .json({
          code: status,
          msg,
        });
     } else {
      response
      .status(200)
      .json({
        code: status,
        msg: 'error',
      });
     }
   } 
   
}
