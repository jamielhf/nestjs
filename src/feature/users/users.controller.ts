
import {ClassSerializerInterceptor, Controller,Post,Request, Get, Param, Res,HttpStatus,UseGuards, Response} from '@nestjs/common';
import { UsersService } from './users.service';
import {AuthGuard} from '@nestjs/passport';

@Controller('api/user')
export class UserController {
  constructor(
    private readonly userService: UsersService,
  ) {}
  /**
   * 
   * 获取登录用户的信息
   * @param {*} req
   * @returns
   * @memberof UserController
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('info')
  async getInfo(@Request() req) {
    console.log(req.user)
    if(req.user && req.user.username) {
      const data = await this.userService.findOne({
        username:req.user.username
      });
      return {
        code: 200,
        data
      };
    }
    
  }
}
