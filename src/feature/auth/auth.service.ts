
import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, ResgisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
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
    console.log(data);
    const { username, email } = data;
    let exitUsername = await this.usersService.findOne({username:123});
    console.log(exitUsername);
    if(exitUsername) {
      return {
        code : 10002,
        msg:'用户名已存在'
      }
    }
  }
}
