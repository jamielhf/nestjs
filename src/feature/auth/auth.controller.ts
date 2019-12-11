
import { Controller, Get,Render, Param,Request, Post, UseGuards, Query, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, ResgisterDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  async login(@Request() req,@Query() query,) {
    return this.authService.login(query);
  }
  
  @Get('register')
  @Render('register')
  async renderRegister(@Request() req) {
    return {
      csrf :req.csrfToken()
    }
  }
  
  @Post('register')
  async register(@Body() body) {
    console.log(body);
    throw new BadRequestException('fail');
    return {
      body
    }
    // return this.authService.register()
  }
}