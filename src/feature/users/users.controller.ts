
import {ClassSerializerInterceptor, Controller,Post,Request, Get, Param, Res,HttpStatus,UseGuards, Response, Body, Req, UseInterceptors} from '@nestjs/common';
import { UsersService } from './users.service';
import {AuthGuard} from '@nestjs/passport';
import { UserInfoDto, UpdateUserInfoDto } from './dto/users.dto';
import { LoggingInterceptor } from '../../core/interceptor/logging.interceptor';


@UseInterceptors(LoggingInterceptor)
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
  async getInfo(@Body() body, @Req() req) {
    let userId = body.userId ||  req.user.id;
    if(userId) {
        const {password,...data} = await this.userService.findOne({
          id: userId
        });
      return {
        data
      };
    }
  }
  /**
   *
   * 更新用户信息
   * @param {UpdateUserInfoDto} body
   * @param {*} req
   * @memberof UserController
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('updateUserInfo')
  async updateUserInfo(@Body() body:UpdateUserInfoDto, @Req() req) {
    return await this.userService.updateUserInfo(body,req.user.id)
  }

}
