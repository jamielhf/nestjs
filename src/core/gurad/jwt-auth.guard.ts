import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly redisService: RedisService
  ) {
    super()
  }
  // https://github.com/nestjs/passport/blob/master/lib/auth.guard.ts
  public token: string = '';
  getRequest(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    this.token = request.headers.authorization.replace('Bearer ', '');
    return request;
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw new UnauthorizedException('身份验证失败');
    } else {
      try {
        // this.redisService.getAsync(user.id, (err,val) => {
        //   console.log(val)
        //   if(!err){
        //     if(this.token != val) {
        //       throw new UnauthorizedException('身份验证失败');
        //     } 
        //   } 
        //    console.log(1)
        // })
      } catch (e) {
        console.log(e);
      }

      return user;
    }

  }
}
