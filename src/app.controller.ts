import { Controller, Get,Render, Param,Request, Post, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LogServive } from './common/log/log.service';


@Controller()
export class AppController {
  constructor(private readonly logger:LogServive,) {

  } 
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    console.log(req.user)
    return req.user;
  }
  @Get('/')
  @Render('index')
  root() {
    this.logger.log(111);
    return { message: 'Hello world!' };
  }
}