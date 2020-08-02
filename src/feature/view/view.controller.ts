
import { Controller, Get, Render, Param, Req, Post, Res, UseGuards, Query, Body, BadRequestException, Next, Logger, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { Response, Request } from 'express';


@Controller('view')
export class ViewController {
  constructor(private readonly authService: AuthService) { }
  // 注册页面 测试用
  @Get('demo')
  async renderRegister(@Req() req: Request, @Query() query, @Res() res: Response) {
    console.log(req.signedCookies);
    res.cookie('token', '1234', { signed: true, maxAge: 24 * 3600 * 1000, });
    return {
      a: 1
    }
  }
  @UseGuards(AuthGuard('github'))
  @Get('github/callback')
  async githubCallback(@Req() req, @Res() res) {
    console.log(req.user);
    try {
      const result = await this.authService.github(req.user);
      res.render('proxy', {
        token: result.token
      });
    } catch (e) {
      console.log(e);
    }
  }



}