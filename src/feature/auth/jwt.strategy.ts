import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';
import { jwtConstants } from './constants';
import { UsersService } from '../users/users.service';
import { md5 } from 'utility';
import { RedisService } from '../../core/redis/redis.service';
import { Users } from '../users/users.entity';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly redisService: RedisService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  async validate(payload: any) {
    console.log('payload', payload);
    const { username } = payload;
    const user = await this.usersService.findOne<Users>({ username });
    console.log('payload', user);
    if (user) {
      // token是否在redis中 没有则不在登陆状态
      const token = await this.redisService.get(user.id);
      if (!token) {
        throw new UnauthorizedException();
      }
      const { password, ...result } = user;
      return result;
    }
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
