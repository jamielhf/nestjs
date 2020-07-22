import { Controller, Get, Render, Param, Request, Post, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Controller()
export class AppController {
  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }
}