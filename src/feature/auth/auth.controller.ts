
import { Controller, Get,Render, Param,Req, Post, Res,UseGuards, Query, Body, BadRequestException, Next, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, ResgisterDto, ActiveRegisterDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { LogServive } from '../../common/log/log.service';
import {logger} from '../../core/decorators/logger.decorators'

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly logger: LogServive
    ) {
      
    }
  // 登录
  
  @Post('login')
  @logger()
  async login(@Body() body,@Res() res) {
      let result = await this.authService.login(body);
      res.json(result)
      return result;
  }
  // 注册
  @Post('register')
  async register(@Body() body:ResgisterDto) {
     return await this.authService.register(body);
  }

   // 注册验证邮箱
  @Post('activeRegister')
  async activeRegister(@Body() body:ActiveRegisterDto) {
    return await this.authService.activeRegister(body);
  }
  
  @Get('register')
  @Render('register')
  async renderRegister(@Req() req,@Query() query) {
    console.log(query);
    return {
      csrf :req.csrfToken()
    }
  }
  
  @Get('test')
  // @Render('test')
  async test(@Req() req,@Query() query) {
    return await this.authService.testSendEmail();
  }
}