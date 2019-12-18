
import { Controller,Post,Request, Get, Param, Res,HttpStatus,UseGuards, Response} from '@nestjs/common';
import { UsersService } from './users.service';
import {AuthGuard} from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UsersService,
  ) {}

  @Get('findAll')
  async getHello() {
    const data = await this.userService.findAll();
    console.log(data);
   return {
     a:2,
     data,
   }
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get('info')
  getProfile(@Request() req) {
    return req.user;
  }
}
