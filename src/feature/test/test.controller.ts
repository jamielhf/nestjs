
import { Controller, Get,Render, Param,Req, Post, Res,UseGuards, Query, Body, BadRequestException, Next, Logger, UseInterceptors } from '@nestjs/common';



@Controller('test')
export class TestController {
  constructor() { }
  // 注册页面 测试用
  @Get('demo')
  @Render('register')
  async renderRegister(@Req() req,@Query() query) {
    return {
      csrf :req.csrfToken()
    }
  }
  
}