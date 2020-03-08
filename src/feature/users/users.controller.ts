
import {ClassSerializerInterceptor, Controller,Post,Request, Get, Param, Res,HttpStatus,UseGuards, Response, Body} from '@nestjs/common';
import { UsersService } from './users.service';
import {AuthGuard} from '@nestjs/passport';
import { UserInfoDto } from './dto/users.dto';

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
  async getInfo(@Body() body:UserInfoDto) {
    if(body.userId) {
      const data = await this.userService.findOne({
        id: body.userId
      });
      return {
        code: 200,
        data
      };
    }
    
  }
  
}
