import { Controller,Post,Request, Get, Param, Res,HttpStatus,UseGuards, Response} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import {AuthGuard} from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService
  ) {}

  // @Get(':id')
  // @UseGuards(AuthGuard())
  // async getHello(@Param() params,@Res() res: Response) {
  //   console.log(params.id);
  //   const data = await this.userService.findAll();
  //   res.status(HttpStatus.OK).json(data);
  // }

  @UseGuards(AuthGuard('jwt'))
  @Get('info')
  getProfile(@Request() req) {
    return req.user;
  }
}
