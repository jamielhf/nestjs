
import { Controller, Get,Render, Param,Req, Post, Res,UseGuards, Query, Body, BadRequestException, Next, Logger, UseInterceptors, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, ResgisterDto, ActiveRegisterDto, ResetPwdDto, ForgetPasswordDto, SetPasswordDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoggingInterceptor } from '../../core/interceptor/logging.interceptor';


@UseInterceptors(LoggingInterceptor)
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
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
  async login(@Body() body:LoginDto,@Res() res,@Req() req) {
    let result = await this.authService.login(body);
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
  async logout(@Res() res,@Req() req) {
    let result = await this.authService.logout(req);
    return result;
  }
  /**
   * 忘记密码
   *
   * @param {ForgetPasswordDto} body
   * @returns
   * @memberof AuthController
   */
  @Post('forgetPassword')
  async forgetPassword(@Body() body: ForgetPasswordDto ) {
    let result = await this.authService.forgetPassword(body);
    return result;
  }
  @Post('setPassword')
  async setPassword(@Body() body: SetPasswordDto ) {
    let result = await this.authService.setPassword(body);
    return result;
  }
  /**
   * 重设密码
   *
   * @param {*} res
   * @param {*} req
   * @returns
   * @memberof AuthController
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('resetPassword')
  async resetPassword(@Body() body:ResetPwdDto,@Req() req) {
    let result = await this.authService.resetPassword(body,req.user.id);
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
  async register(@Body() body:ResgisterDto,@Res() res) {
     const result = await this.authService.register(body);
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
  async activeRegister(@Body() body:ActiveRegisterDto,@Res() res) {
    const result = await this.authService.activeRegister(body);
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
}