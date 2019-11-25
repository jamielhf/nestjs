import { Controller, Get,Render, Param,Request, Post, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './feature/auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    console.log(req.user)
    return req.user;
  }
  @Get('index')
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }
}