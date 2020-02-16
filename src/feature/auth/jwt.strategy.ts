import { ExtractJwt, Strategy,VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { UsersService } from '../users/users.service';
import { md5 } from 'utility';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const {username} = payload;
    const user = await this.usersService.findOne({username});
    console.log(user);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    if (!user) {
      throw new UnauthorizedException();
    }
    return user
  }
}