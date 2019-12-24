/*
 * @Author: your name
 * @Date: 2019-12-02 15:03:49
 * @LastEditTime : 2019-12-24 14:53:21
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nestjs\src\feature\auth\auth.controller.ts
 */

import { Controller, Get,Render, Param,Request, Post, UseGuards, Query, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, ResgisterDto, ActiveRegisterDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  async login(@Request() req,@Query() query,) {
    return this.authService.login(query);
  }
  
  @Get('register')
  @Render('register')
  async renderRegister(@Request() req,@Query() query) {
    console.log(query);
    return {
      csrf :req.csrfToken()
    }
  }
  
 
  @Get('test')
  // @Render('test')
  async test(@Request() req,@Query() query) {
    return await this.authService.testSendEmail();
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
}