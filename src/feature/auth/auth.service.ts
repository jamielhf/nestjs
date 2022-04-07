import {
  Injectable,
  HttpException,
  HttpStatus,
  Response,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {
  LoginDto,
  ResgisterDto,
  ActiveRegisterDto,
  ResetPwdDto,
  ForgetPasswordDto,
  SetPasswordDto,
} from './dto/auth.dto';
import { ApiException } from '../../core/exceptions/api.exception';
import { ApiErrorCode } from '../../core/enums/api-error-code.enum';
import {
  md5,
  encryptMD5,
  diffEncryptMD5,
  apiSuccessMsg,
} from '../../common/util';
import { MailService } from '../../common/services/mail.service';
import { SECRET } from '../../config/app';
import { RedisService } from '../../core/redis/redis.service';
import { GitHubProfile } from './github.strategy';
import { logger, errorLogger } from '../../common/logger';
import { Users } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
    private readonly mailer: MailService,
  ) {}
  /**
   * 重新验证
   * @param username
   * @param password
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne<Users>({ username });
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
  async login(data, res) {
    const { username, password } = data;
    let user = await this.usersService.findOne<Users>({ username });
    if (!user) {
      throw new ApiException('不存在用户', ApiErrorCode.LOGIN_FAIL);
    }
    if (md5(password) !== user.password) {
      throw new ApiException('密码有误', ApiErrorCode.LOGIN_FAIL);
    } else if (user.active == 0) {
      // 账号没有激活 重新验证
      await this.resendEmail(user);
      throw new ApiException(
        '账号没激活,已重新发送邮件到注册邮箱',
        ApiErrorCode.LOGIN_FAIL,
      );
    }
    const payload = { username: user.username, sub: user.id, role: user.role };
    let token;
    // 缓存到redis
    try {
      token = this.jwtService.sign(payload);
      await this.redisService.set(user.id, token, 12 * 3600);
    } catch (e) {
      errorLogger.log(e);
    }
    console.log('token', token);
    // 写token 到 cookie 方便ssr
    res.cookie('token', token, {
      domain: 'lhf.com',
      path: '/',
      signed: true,
      maxAge: 24 * 3600 * 1000,
      httpOnly: true,
    });

    return {
      token,
      userInfo: user,
    };
  }
  /**
   *
   * 登出
   * @param {*} req
   * @returns
   * @memberof AuthService
   */
  async logout(req) {
    if (req.user && req.user.id) {
      await this.redisService.del(req.user.id);
      return {
        msg: '登出',
      };
    } else {
      throw new ApiException('没有用户信息', ApiErrorCode.USER_NO_EXIT);
    }
  }
  /**
   * 注册
   *
   * @param {ResgisterDto} data
   * @memberof AuthService
   */
  async register(data: ResgisterDto) {
    const { username, email } = data;
    let exitUsername = await this.usersService.findOne<Users>({ username });
    if (exitUsername) {
      throw new ApiException('用户名已存在', ApiErrorCode.USERNAME_INVALID);
    } else {
      let exitEmail = await this.usersService.findOne<Users>({ email });
      if (exitEmail) {
        throw new ApiException('邮箱已存在', ApiErrorCode.EMAIL_INVALID);
      }
    }
    let user = {
      ...data,
      nickName: data.username,
      password: md5(data.password),
      avatar: '',
      type: 'user',
    };
    try {
      let res = await this.usersService.save(user);
      if (res) {
        const r = await this.resendEmail(user);
        if (r) {
          return {
            msg: '注册成功，已经发送验证邮件',
          };
        }
      }
    } catch (e) {
      throw new ApiException(e, ApiErrorCode.TIMEOUT);
    }
  }
  /**
   * 重设密码
   *
   * @param {ResetPwdDto} data
   * @param {*} userId
   * @memberof AuthService
   */
  async resetPassword(data: ResetPwdDto, userId: string) {
    const user = await this.usersService.update(
      {
        id: userId,
        password: encryptMD5(data.oldPwd),
      },
      {
        password: encryptMD5(data.password),
      },
    );
    return user;
  }
  /**
   * 设置密码
   *
   * @param {SetPasswordDto} body
   * @returns
   * @memberof AuthService
   */
  async setPassword(body: SetPasswordDto) {
    const email = await this.redisService.get(body.token);
    if (!email) {
      throw new ApiException(
        '邮箱验证失败,token失效',
        ApiErrorCode.TOKEN_INVALID,
      );
    }
    const user = await this.usersService.findOne<Users>({ email });
    if (user) {
      logger.info(
        '验证token',
        diffEncryptMD5(user.email + user.id + SECRET, body.token),
      );
      // 对比key是否正确
      if (!diffEncryptMD5(user.email + user.id + SECRET, body.token)) {
        throw new ApiException('邮箱验证失败', ApiErrorCode.TOKEN_INVALID);
      } else {
        const res = await this.usersService.update(
          {
            id: user.id,
          },
          {
            password: encryptMD5(body.password),
          },
        );
        // 设置token失效
        await this.redisService.del(body.token);
        return {
          msg: res.raw.affectedRows === 1 ? '更新成功' : '更新失败',
        };
      }
    } else {
      throw new ApiException('邮箱未注册', ApiErrorCode.USER_NO_EXIT);
    }
  }

  /**
   *
   * 发送重设密码邮件
   * @param {ForgetPasswordDto} body
   * @returns
   * @memberof AuthService
   */
  async forgetPassword(body: ForgetPasswordDto) {
    const user = await this.usersService.findOne<Users>({ email: body.email });
    if (!user) {
      throw new ApiException('邮件未注册', ApiErrorCode.USER_NO_EXIT);
    } else {
      // 加密token
      const token = encryptMD5(user.email + user.id + SECRET);
      // 发送验证邮件
      let sendState = await this.mailer.sendActiveMail(
        user.email,
        token,
        user.username,
      );
      logger.info(
        '密码邮件token',
        JSON.stringify(`${token},${user.email},${user.username}`),
      );
      // 放redis 24h，重设密码后就删除
      this.redisService.set(token, user.email, 24 * 3600);
      if (sendState === 'success') {
        return true;
      } else {
        throw new ApiException('邮件发送失败', ApiErrorCode.TIMEOUT);
      }
    }
  }
  /**
   * github登陆
   *
   * @param {GitHubProfile} profile
   * @returns
   * @memberof AuthService
   */
  async github(profile: GitHubProfile) {
    if (!profile) {
      throw new ApiException(
        '您 GitHub 账号的 认证失败',
        ApiErrorCode.USER_NO_EXIT,
      );
    }
    // 获取用户的邮箱
    const email =
      profile.emails && profile.emails[0] && profile.emails[0].value;
    // 根据 githubId 查找用户
    let existUser = await this.usersService.findOne<Users>({
      githubId: profile.id,
    });
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
      };
      existUser = await this.usersService.save(user);
    } else {
      existUser.email = email || existUser.email;
      existUser.avatar = profile._json.avatar_url;
      existUser.githubAccesstoken = profile.accessToken;
    }
    const payload = { username: existUser.username, sub: existUser.id };

    const token = this.jwtService.sign(payload);
    // 设置白名单
    await this.redisService.set(existUser.id, token, 24 * 3600);
    return {
      token,
    };
  }
  /**
   *
   * 发送邮箱验证码
   * @param {*} user
   * @returns
   * @memberof AuthService
   */
  async resendEmail(user) {
    if (!user) {
      throw new ApiException('用户信息不存在', ApiErrorCode.USER_NO_EXIT);
    }
    const token = encryptMD5(user.email + user.password + SECRET);
    // 发送验证邮件
    let sendState = await this.mailer.sendActiveMail(
      user.email,
      token,
      user.username,
    );
    logger.info(
      '验证邮件token',
      JSON.stringify(`${token},${user.email},${user.username}`),
    );
    if (sendState === 'success') {
      return true;
    } else {
      throw new ApiException('邮件发送失败', ApiErrorCode.TIMEOUT);
    }
  }
  /**
   *
   * 激活账号
   * @param {ActiveRegisterDto} data
   * @returns
   * @memberof AuthService
   */
  async activeRegister(data: ActiveRegisterDto) {
    const { username, key } = data;

    let user = await this.usersService.findOne<Users>({ username });
    if (!user) {
      throw new ApiException('用户不存在', ApiErrorCode.USER_NO_EXIT);
    }
    let keyCode = user.email + user.password + SECRET;
    // 对比key是否正确
    if (!diffEncryptMD5(keyCode, key)) {
      throw new ApiException(
        '信息有误，帐号无法被激活。',
        ApiErrorCode.TOKEN_INVALID,
      );
    }
    user.active = 1;
    try {
      await this.usersService.save(user);
      return {
        msg: '已激活',
      };
    } catch (e) {
      throw new ApiException(e, ApiErrorCode.TIMEOUT);
    }
  }
}
