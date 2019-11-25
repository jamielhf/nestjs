
import { Controller, Get,Render, Param,Request, Post, UseGuards, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  async login(@Request() req,@Query() query,) {
    return this.authService.login(query);
  }
  
}