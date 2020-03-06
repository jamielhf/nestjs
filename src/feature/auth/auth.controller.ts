
import { Controller, Get,Render, Param,Req, Post, Res,UseGuards, Query, Body, BadRequestException, Next, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, ResgisterDto, ActiveRegisterDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import {logger} from '../../core/decorators/logger.decorators'
import { LogServive } from '../../common/log/log.service';


@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly logger: LogServive,
    ) { }
  /**
   *
   * 登陆
   * @param {*} body
   * @param {*} res
   * @returns
   * @memberof AuthController
   */
  @Post('login')
  @logger()
  async login(@Body() body:LoginDto,@Res() res,@Req() req) {
    let result = await this.authService.login(body);
    res.json(result);
    return result;
  }

  /**
   * 登出
   *
   * @param {*} res
   * @param {*} req
   * @returns
   * @memberof AuthController
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('logout')
  @logger()
  async logout(@Res() res,@Req() req) {
    let result = await this.authService.logout(req);
    res.json(result);
    return result;
  }

  @Post('resetPassword')
  @logger()
  async resetPassword(@Res() res,@Req() req) {
    let result = await this.authService.resetPassword();
    res.json(result);
    return result;
  }
  /**
   *
   * 注册
   * @param {ResgisterDto} body
   * @returns
   * @memberof AuthController
   */
  @Post('register')
  @logger()
  async register(@Body() body:ResgisterDto,@Res() res) {
     const result = await this.authService.register(body);
     res.json(result)
    return result;
  }

  /**
   * 
   * 注册验证邮箱
   * @param {ActiveRegisterDto} body
   * @returns
   * @memberof AuthController
   */
  @Post('activeRegister')
  @logger()
  async activeRegister(@Body() body:ActiveRegisterDto,@Res() res) {
    const result = await this.authService.activeRegister(body);
    res.json(result)
   return result;
  }

 /**
  * github登陆
  */
  @Get('github')
  @UseGuards(AuthGuard('github'))
  async github() {
    return null
  }
 /**
  * github登陆回调
  */
  @UseGuards(AuthGuard('github'))
  @Get('github/callback')
  async githubCallback(@Req() req, @Res() res) {
    try {
     const result = await this.authService.github(req.user);
     console.log(22,result);
      res.render('proxy',{
        token: result.token
      });
    } catch (e) {
      console.log(e);
    }
     
  }
  // 注册页面 测试用
  @Get('register')
  @Render('register')
  async renderRegister(@Req() req,@Query() query) {
    return {
      csrf :req.csrfToken()
    }
  }
  // 注册页面 测试用
  @Get('proxy')
  async proxy(@Req() req, @Res() res) {
    res.render('proxy',{
      token: 123132
    });
  }
}