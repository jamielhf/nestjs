import { Controller, Get,Render, Param,Request, Post, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Get('auth/login')
  async login(@Request() req,@Query() query,) {
    console.log(query);
    return this.authService.login(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @Get('index')
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }
}