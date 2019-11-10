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
  @Post('auth/login')
  async login(@Request() req, @Response() res) {
    console.log(req.user);
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
