import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, ResgisterDto } from './dto/auth.dto';
import { ApiException } from '../../core/exceptions/api.exception';
import { ApiErrorCode } from '../../core/enums/api-error-code.enum';
import {md5} from '../../common/util';
import { MailService } from '../../common/services/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailer:MailService,
  ) {}
/**
 * 重新验证
 * @param username 
 * @param password 
 */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  /**
   * 登陆
   * 登陆成功后返回token
   * @param data 
   */
  async login(data: LoginDto) {
    const {username,password} = data;
    if(!username || ! password) {
      return {
        code: 200,
        message: '用户名或密码为空！',
      };
    }
    const user = await this.usersService.findOne(username);
    
    if(!user) {
      return {
        code: 200,
        message: '不存在用户',
      };
    }
    if(password !== user.password) {
      return {
        code: 200,
        message: '密码有误',
      };
    }
    delete user.password;
    return {
      code: 200,
      data:{
        ...user,
        token: this.jwtService.sign(data),
      },
      message: '',
    };
  }
  /**
   * 注册
   *
   * @param {ResgisterDto} data
   * @memberof AuthService
   */
  async register(data:ResgisterDto) {
    const { username, email } = data;
    let exitUsername = await this.usersService.findOne({username});
    if(exitUsername) {
      throw new ApiException('用户名已存在',ApiErrorCode.USERNAME_INVALID);
    } else {
      let exitEmail = await this.usersService.findOne({email});
      if(exitEmail) {
        throw new ApiException('邮箱已存在',ApiErrorCode.EMAIL_INVALID);
      }
    }
    let user = {
      ...data,
      nick_name:data.username,
      password: md5(data.password),
      avatar:'https://huyaimg.msstatic.com/avatar/1076/7e/e1d48955f39a25fb944f4dedb3ed16_180_135.jpg',
      type:'user',
    }
    try{
      let res = await this.usersService.save(user);
      if(res) {
        // const token = encryptMD5(user.email + user.pass + this.secret);
        this.mailer.sendActiveMail(user.email,'111',user.username);
        return {
          code : 200,
          msg: 'success'
        }
      }
    } catch (e) {
      throw new ApiException(e,ApiErrorCode.TIMEOUT);
    }
   
  }
}
