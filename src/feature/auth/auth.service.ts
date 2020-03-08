import { Injectable, HttpException, HttpStatus,Response } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, ResgisterDto, ActiveRegisterDto } from './dto/auth.dto';
import { ApiException } from '../../core/exceptions/api.exception';
import { ApiErrorCode } from '../../core/enums/api-error-code.enum';
import { md5, encryptMD5, diffEncryptMD5, apiSuccessMsg } from '../../common/util';
import { MailService } from '../../common/services/mail.service';
import {SECRET} from  '../../config/app'
import { RedisService } from '../../core/redis/redis.service';
import { LogServive } from '../../common/log/log.service';
import { GitHubProfile } from './github.strategy';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
    private readonly mailer:MailService,
    private readonly logger: LogServive,
  ) {}
/**
 * 重新验证
 * @param username 
 * @param password 
 */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({username});
    if (user && user.password === md5(password)) {
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
  async login(data) {
    const {username,password} = data;
    
    const user = await this.usersService.findOne({username});
    if(!user) {
      throw new ApiException('不存在用户',ApiErrorCode.LOGIN_FAIL);
    }
    if(md5(password) !== user.password) {
      throw new ApiException('密码有误',ApiErrorCode.LOGIN_FAIL);
    } else if(user.active == 0) {
      // 账号没有激活 重新验证
      await this.resendEmail(user);
      throw new ApiException('账号没激活,已重新发送邮件到注册邮箱',ApiErrorCode.LOGIN_FAIL);
    }
    const payload = { username: user.username, sub: user.id };
    
    const token = this.jwtService.sign(payload);
    await this.redisService.set(user.id,token);
    return apiSuccessMsg({
        token,
    })
  }
  /**
   *
   * 登出
   * @param {*} req
   * @returns
   * @memberof AuthService
   */
  async logout(req){
    if(req.user && req.user.id) {
      await this.redisService.del(req.user.id);
      return apiSuccessMsg();
    } else {
      throw new ApiException('没有用户信息',ApiErrorCode.USER_NO_EXIT);
    }
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
      nickName:data.username,
      password: md5(data.password),
      avatar:'https://huyaimg.msstatic.com/avatar/1076/7e/e1d48955f39a25fb944f4dedb3ed16_180_135.jpg',
      type:'user',
    }
    try{
      let res = await this.usersService.save(user);
      if(res) {
       const r =  await this.resendEmail(user);
       if(r) {
         return apiSuccessMsg({},'注册成功，已经发送验证邮件');
       }
       
      }
    } catch (e) {
      throw new ApiException(e,ApiErrorCode.TIMEOUT);
    }
   
  }
  async resetPassword() {

  }

  async github(profile: GitHubProfile) {
    if(!profile) {
      throw new ApiException('您 GitHub 账号的 认证失败',ApiErrorCode.USER_NO_EXIT);
    }
    // 获取用户的邮箱
    const email = profile.emails && profile.emails[0] && profile.emails[0].value;
    // 根据 githubId 查找用户
    let existUser = await this.usersService.findOne({githubId: profile.id});
    // 用户不存在则创建
    if (!existUser) {
      let user = {
        nickName: profile.username,
        username: profile.username,
        password: '',
        active: 1,
        email: email || existUser.email,
        avatar: profile._json.avatar_url,
        githubAccesstoken: profile.accessToken,
        githubUsername: profile.username,
        githubId: profile.id,
        type: 'user',
      }
        existUser = await this.usersService.save(user);
    } else {
      existUser.email = email || existUser.email;
      existUser.avatar = profile._json.avatar_url;
      existUser.githubAccesstoken = profile.accessToken;
    }
    const payload = { username: existUser.username, sub: existUser.id };
    
    const token = this.jwtService.sign(payload);
    // 设置白名单
    await this.redisService.set(existUser.id,token);
    return {
        token,
    }
  }
  /**
   *
   * 发送邮箱验证码
   * @param {*} user
   * @returns
   * @memberof AuthService
   */
  async resendEmail(user) {
    if(!user) {
      throw new ApiException('用户信息不存在',ApiErrorCode.USER_NO_EXIT);
    }
    const token = encryptMD5(user.email + user.password + SECRET);
    // 发送验证邮件
    let sendState = await this.mailer.sendActiveMail('linhaifeng3@huya.com',token,user.username);
    this.logger.log('验证邮件token',JSON.stringify(`${token},${user.email},${user.username}`))
    if(sendState === 'success') {
      return true
    } else {
      throw new ApiException('邮件发送失败',ApiErrorCode.TIMEOUT);
    }
  }
  /**
   *
   * 激活账号
   * @param {ActiveRegisterDto} data
   * @returns
   * @memberof AuthService
   */
  async activeRegister(data:ActiveRegisterDto) {
    const { username, key } = data;
    
    let user = await this.usersService.findOne({username});
    if(!user) {
      throw new ApiException('用户不存在',ApiErrorCode.USER_NO_EXIT);
    }
    let keyCode = user.email + user.password + SECRET;
    // 对比key是否正确
    if(!diffEncryptMD5(keyCode, key)) {
      throw new ApiException('信息有误，帐号无法被激活。',ApiErrorCode.TOEKN_INVALID);
    }
    user.active = 1;
    try {
      await this.usersService.save(user);
      return apiSuccessMsg()
    } catch (e) {
      throw new ApiException(e,ApiErrorCode.TIMEOUT);
    }
    
  }
}
