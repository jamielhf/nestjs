/*
 * @Author: your name
 * @Date: 2019-12-02 15:03:49
 * @LastEditTime: 2019-12-17 18:26:07
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \nestjs\src\feature\auth\auth.service.ts
 */

import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, ResgisterDto } from './dto/auth.dto';
import { ApiException } from '../../common/exceptions/api.exception';
import { ApiErrorCode } from '../../common/enums/api-error-code.enum';
import { Users } from '../users/users.entity';
import { UsersModule } from '../users/users.module';

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
    let user =  {
      nickName:data.username,
      type:'user',
      ...data,
    }
    let res = await this.usersService.save(user);
    console.log(res);
  }
}
