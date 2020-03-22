
import { Controller, Get,Render, Param,Req, Post, Res,UseGuards, Query, Body, BadRequestException, Next, Logger, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';



@Controller('view')
export class ViewController {
  constructor(private readonly authService: AuthService){}
  // 注册页面 测试用
  @Get('demo')
  @Render('register')
  async renderRegister(@Req() req,@Query() query) {
  
  }
  @UseGuards(AuthGuard('github'))
  @Get('github/callback')
  async githubCallback(@Req() req, @Res() res) {
    console.log(req.user);
    try {
     const result = await this.authService.github(req.user);
      res.render('proxy',{
        token: result.token
      });
    } catch (e) {
      console.log(e);
    }
  }


  
}